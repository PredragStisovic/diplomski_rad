import { Prisma } from '@prisma/client';

export type FetchedRecordReturnType = Prisma.RecordGetPayload<{
  include: {
    RecordFiles: {
      select: {
        File: true;
      };
    };
  };
}>;
