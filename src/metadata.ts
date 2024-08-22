/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/graphql": { "models": [[import("./dto/test.input"), { "CreateInput": { name: { type: () => String }, description: { type: () => String }, omitUpdateProperty: { type: () => String } } }], [import("./entities/test.entity"), { "TestEntity": { id: { type: () => Number }, name: { type: () => String }, description: { type: () => String } } }], [import("./dto/update-test.input"), { "UpdateInput": { id: { type: () => Number } } }]] } };
};