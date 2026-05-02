export const mapUserResponse = (user) => {
  const roles = user.roles.map((role) => role.id);

  const permissions = [
    ...new Set(user.roles.flatMap((role) => role.permissions.map((p) => p.id))),
  ];

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    status: user.status,
    roles,
    permissions,
  };
};
