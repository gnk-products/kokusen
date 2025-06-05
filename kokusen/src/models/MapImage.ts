import { Prisma } from '@prisma/client';
import _ from 'lodash';

import DBClient from '@/models/DBClient';

export type MapImageType = {
  id: number;
  country_id: number;
  map_image_id: string;
  is_pano: boolean;
  compass_angle: number;
  lat: number;
  long: number;
};

export default class MapImage {
  static async randFetch(countryIds: number[], seed: string, count: number) {
    const imageIds: number[] = [];
    for (const countryId of countryIds) {
      const myimageIds: { id: number }[] = await DBClient.instance.$queryRaw`
      SELECT
        id
      FROM MapImage
      WHERE country_id IN (${Prisma.join([countryId])})
      ORDER BY RAND(${seed})
      LIMIT ${count}
    `;
      imageIds.push(...myimageIds.map((image) => image.id));
    }
    const targetImageIds = _.sampleSize(imageIds, count);
    const images: MapImageType[] = await DBClient.instance.mapImage.findMany({
      select: {
        id: true,
        country_id: true,
        map_image_id: true,
        is_pano: true,
        compass_angle: true,
        lat: true,
        long: true,
      },
      where: {
        id: {
          in: targetImageIds,
        },
      },
    });
    return _.shuffle(images);
  }
}
