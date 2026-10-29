export function roleAtPosition(chapters, position) {
  let role = 'developer';
  for (const chapter of chapters) {
    if (position >= chapter.top) role = chapter.role;
    else break;
  }
  return role;
}
