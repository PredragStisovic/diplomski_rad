import { Prisma } from '@prisma/client';

export type CreatedOrderReturnType = Prisma.OrderGetPayload<{
  include: {
    OrderItems: {
      include: {
        Record: true;
      };
    };
  };
}>;
