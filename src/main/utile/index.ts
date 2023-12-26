export function createRoomId(myid: string, buddyId: string): string {
  const idArray = [myid, buddyId];
  idArray.sort();

  const roomId = `${idArray[0]}:${idArray[1]}`;

  return roomId;
}

