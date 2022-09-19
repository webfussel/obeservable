interface IEventVariants {
  every: Function[]
  once: Function[]
}

export interface IEvent {
  [k: string]: IEventVariants
}
