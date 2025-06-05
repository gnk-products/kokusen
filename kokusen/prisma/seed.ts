import _ from 'lodash';

import MapImageSeed from '../src/data/map_images.json';
import MatchSeed from '../src/data/matchlist.json';
import DBClient from '../src/models/DBClient';

interface MapImageData {
  code: string;
  name: string;
  name_ja: string;
  bbox: number[];
  country_images: {
    small: string;
    regular: string;
    country: string;
  };
  images: {
    id: string;
    is_pano: boolean;
    geometry?: {
      type: string;
      coordinates?: number[];
    };
    compass_angle: number;
  }[];
}

interface MatchData {
  slug: string;
  order: number;
  codes: string[];
}

async function main() {
  const mapImageSeed = MapImageSeed as { [key: string]: MapImageData };
  const mapImageKeys = Object.keys(mapImageSeed);
  const matchSeed = MatchSeed as MatchData[];
  const countryUpsertQueries = mapImageKeys.map((key) => {
    const mapImage = mapImageSeed[key];
    const mapImagesData = _.compact(
      mapImage.images.map((image) => {
        const [long, lat] = image.geometry?.coordinates || [];
        if (!lat || !long) {
          return;
        }
        const imageData = {
          map_image_id: image.id,
          is_pano: image.is_pano,
          lat,
          long,
          compass_angle: image.compass_angle,
        };
        return {
          where: { map_image_id: image.id },
          update: imageData,
          create: imageData,
        };
      }),
    );
    const data = {
      code: mapImage.code,
      name: mapImage.name,
      name_ja: mapImage.name_ja,
      bbox: mapImage.bbox.join(','),
      sm_image: mapImage.country_images.small,
      reg_image: mapImage.country_images.regular,
    };
    return DBClient.instance.country.upsert({
      where: { code: data.code },
      update: {
        ...data,
        mapImages: { upsert: mapImagesData },
      },
      create: {
        ...data,
        mapImages: {
          createMany: { data: mapImagesData.map((item) => item.create) },
        },
      },
    });
  });
  await DBClient.instance.$transaction(countryUpsertQueries);
  const matchUpsertQueries = matchSeed.map((match) => {
    return DBClient.instance.match.upsert({
      where: {
        slug: match.slug,
      },
      create: {
        order: match.order,
        slug: match.slug,
        matchCountries: {
          createMany: {
            data: match.codes.map((code) => ({
              country_code: code,
            })),
          },
        },
      },
      update: {
        order: match.order,
        matchCountries: {
          createMany: {
            data: match.codes.map((code) => ({
              country_code: code,
            })),
            skipDuplicates: true,
          },
        },
      },
    });
  });
  await DBClient.instance.$transaction(matchUpsertQueries);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await DBClient.instance.$disconnect();
  });
