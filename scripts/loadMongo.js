import { ObjectId } from 'mongodb';

const db = db.getSiblingDB('between');
db.tasks.insertMany([
  {
    price: {
      units: 13.883492192691428,
      currency: 'EUR',
    },
    images: [
      new ObjectId('67ca6372a6e2d2fa56c75fa0'),
      new ObjectId('67ca6373a6e2d2fa56c75fa1'),
    ],
    status: 'COMPLETE',
    createdAt: 1741316978805.0,
    path: '67ca6372a6e2d2fa56c75f9e',
  },
]);

db.images.insertMany([
  {
    _id: new ObjectId('67ca62df4de771d72c7e0d42'),
    path: '/tmp/18f14463a91f8316ec8daea09ab5baaf.jpg',
    hash: '18f14463a91f8316ec8daea09ab5baaf',
    createdAt: 1741316831571.0,
    resolution: null,
  },
  {
    _id: new ObjectId('67ca63414b84db8bda4b3881'),
    path: '/tmp/18f14463a91f8316ec8daea09ab5baaf.jpg',
    hash: '18f14463a91f8316ec8daea09ab5baaf',
    createdAt: 1741316929337.0,
    resolution: null,
  },
]);
