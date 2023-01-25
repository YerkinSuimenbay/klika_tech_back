export const getPlaylistSql = `
  with playlist as (
    SELECT si."id" AS singer_id, si."name" AS singer, 
            s."id" AS song_id, s."name" AS song, 
            g."id" AS genre_id,  g."name" AS genre, 
            s."year" AS year 
    FROM songs s 
    LEFT JOIN singers si ON s.singer_id = si.id
    LEFT JOIN genres g ON s.genre_id = g.id 
  )
`;
