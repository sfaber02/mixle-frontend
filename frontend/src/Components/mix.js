import React from 'react'

export default function Mix({ audio }) {
  return (
    <tr>
      <td>
          
            {audio.title}
      </td>
      <td>
            {audio.artist}
      </td>
      <td>
            {audio.album}
      </td>
      <td>
            {audio.totalVotes}
      </td>
    </tr>
  );
}
