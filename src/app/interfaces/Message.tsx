interface Message {
  id: number;
  user_origem_id: number;
  message: string;
  date: Date;
  user_origem: {
    name: string;
  };
  name: string;
  room_id: number;
}
interface PayLoadMessage {
  id: number;
  user_origem_id: number;
  message: string;
  user_origem: {
    name: string;
  };
  date: Date;
  room_id: number;
}
