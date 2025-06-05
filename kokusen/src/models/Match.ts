import DBClient from '@/models/DBClient';

export type MatchType = Awaited<ReturnType<typeof Match.fetch>>[number];

export type CountryType = MatchType['matchCountries'][number]['country'];

export default class Match {
  static async fetch(ids: number[] | null = null) {
    const matchList = await DBClient.instance.match.findMany({
      select: {
        id: true,
        slug: true,
        matchCountries: {
          select: {
            country: {
              select: {
                id: true,
                code: true,
                name: true,
                name_ja: true,
                sm_image: true,
                reg_image: true,
              },
            },
          },
        },
      },
      where: {
        id: ids ? { in: ids } : undefined,
        deleted_at: null,
      },
      orderBy: {
        order: 'asc',
      },
    });
    return matchList;
  }
}
