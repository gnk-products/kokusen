import CurrentUser from '@/models/CurrentUser';
import DBClient from '@/models/DBClient';
import { axiosInstance } from '@/utils/axios';

export type MatchAnswerType = Awaited<ReturnType<typeof MatchAnswer.create>>;

export type MatchAnswerInputType = {
  match_seed_id: number;
  user_id: string;
  answer_id: number;
};

export default class MatchAnswer {
  static async create(matchSeedId: number, userId: string, answer: number) {
    const matchSeed = await DBClient.instance.matchSeed.findFirst({
      select: {
        mapImage: {
          select: {
            country_id: true,
          },
        },
      },
      where: {
        id: matchSeedId,
        deleted_at: null,
      },
    });
    if (!matchSeed) {
      throw new Error('not found');
    }
    const matchAnswer = await DBClient.instance.matchAnswer.create({
      data: {
        match_seed_id: matchSeedId,
        user_id: userId,
        answer_id: matchSeed.mapImage.country_id,
        user_answer_id: answer,
      },
      select: {
        match_seed_id: true,
        answer_id: true,
        user_answer_id: true,
      },
    });
    return matchAnswer;
  }

  static async createViaApi(matchSeedId: number, answer: number) {
    const path = '/match_answer';
    const body = {
      match_seed_id: matchSeedId,
      user_id: CurrentUser.getOrCreate(),
      answer_id: answer,
    };
    const data = await axiosInstance.post(path, body);
    return data.data;
  }
}
