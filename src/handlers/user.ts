import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

export const signIn = async (req, res) => {
  const user = prisma.user.findUnique({
    where: {
      username: req.body.username,
      email: req.body.email,
    },
  });

  const isValid = await comparePasswords(
    req.body.password,
    (
      await user
    ).password
  );
  if (!isValid) {
    res.status(401);
    res.json({ message: "invalid" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
