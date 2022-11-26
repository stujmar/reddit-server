import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

console.log("PROCESS.ENV")
console.log(process.env)

// import password from .env at root
const PASSWORD = process.env.PASSWORD;
const USERNAME = process.env.USERNAME;

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: "redditserver",
    type: "postgresql",
    user: USERNAME,
    password: PASSWORD,
    debug: !__prod__,
  });

  console.log("---SQL ONE---");
  const post = orm.em.create(Post, {title: 'my first post'});
  await orm.em.persistAndFlush(post);
  console.log("---SQL TWO---");
  await orm.em.nativeInsert(Post, {title: 'my second post'});

};

main();
