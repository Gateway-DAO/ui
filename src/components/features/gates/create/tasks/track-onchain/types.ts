export type InputAbi = {
  name: string;
  type: string;
};

export type EventAbi = {
  inputs: InputAbi[];
  name: string;
  type: 'function' | 'event';
};
