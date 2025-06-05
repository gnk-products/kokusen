import dayjs from 'dayjs';
import _ from 'lodash';
import seedrandom from 'seedrandom';

import CurrentUser from '@/models/CurrentUser';
import DBClient from '@/models/DBClient';
import MapImage from '@/models/MapImage';
import Match from '@/models/Match';
import { axiosInstance } from '@/utils/axios';
import { DEFAULT_MATCH_MAP_COUNT } from '@/utils/constants';

export type MatchSeedType = Awaited<ReturnType<typeof MatchSeed.fetch>>[number];

export default class MatchSeed {
  static MATCH_MAP_COUNT_STORAGE_KEY = 'matchMapCount';

  static setMatchMapCount(count: number) {
    localStorage.setItem(this.MATCH_MAP_COUNT_STORAGE_KEY, count.toString());
  }

  static getMatchMapCount() {
    const count =
      localStorage.getItem(this.MATCH_MAP_COUNT_STORAGE_KEY) ||
      DEFAULT_MATCH_MAP_COUNT;
    return _.parseInt(count.toString());
  }

  static async fetch(matchId: number, slug: string, userId: string) {
    const matchSeeds = await DBClient.instance.matchSeed.findMany({
      select: {
        id: true,
        order: true,
        mapImage: {
          select: {
            country_id: true,
            map_image_id: true,
            is_pano: true,
            lat: true,
            long: true,
            compass_angle: true,
          },
        },
        matchAnswer: {
          select: {
            match_seed_id: true,
            user_answer_id: true,
            answer_id: true,
          },
          where: {
            user_id: userId,
          },
        },
      },
      where: {
        match_id: matchId,
        slug: slug,
        deleted_at: null,
        mapImage: {
          deleted_at: null,
        },
      },
      orderBy: {
        order: 'asc',
      },
    });
    return matchSeeds;
  }

  static async fetchViaApi(matchId: number, slug: string) {
    const path = `/match_seed/${matchId}/${slug}/${CurrentUser.getOrCreate()}`;
    const data = await axiosInstance.get(path);
    return data.data as MatchSeedType[];
  }

  static async generate(matchId: number, userId: string, mapCount: number) {
    const match = await Match.fetch([matchId]);
    if (!match || !match[0]) {
      throw new Error('not found');
    }
    const countries = match[0].matchCountries.map((country) => country.country);
    const slug = Math.abs(seedrandom(dayjs().toString()).int32()).toString();
    const images = await MapImage.randFetch(
      countries.map((country) => country.id),
      slug,
      mapCount,
    );
    await DBClient.instance.matchSeed.createMany({
      data: images.map((image, index) => {
        return {
          slug,
          match_id: matchId,
          map_image_id: image.id,
          order: index + 1,
          created_by: userId,
        };
      }),
    });
    return slug;
  }

  static async generateViaApi(matchId: number) {
    const path = '/match_seed';
    const data = await axiosInstance.post(path, {
      match_id: matchId,
      user_id: CurrentUser.getOrCreate(),
      map_count: this.getMatchMapCount(),
    });
    return data.data as { slug: string };
  }
}
