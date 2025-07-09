import { customType } from 'drizzle-orm/sqlite-core';

export const dateTime = customType<{ data: Date; driverData: string }>({
  dataType() {
    return 'text';
  },
  toDriver(value: Date) {
    return value.toISOString();
  },
  fromDriver(value: string) {
    return new Date(value);
  },
});
