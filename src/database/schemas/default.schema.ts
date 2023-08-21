import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class DefaultSchema {
  @Prop({
    type: Boolean,
    default: false,
  })
  trashed: boolean;

  @Prop({
    type: Number,
    default: Date.now,
  })
  createdAt: number;

  @Prop({
    type: Number,
    default: Date.now,
  })
  updatedAt: number;
}
