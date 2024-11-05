export type MessageBrokerType = {
    //producer:
    connectProducer: <T>() => Promise<T>;
    disconnectProducer: <T>() => Promise<void>;
    publish: (data:unknown) => Promise<boolean>;

    //consumer:
    connectConsumer:<T>() => Promise<T>;
    disconnectConsumer: () => Promise<void>;
    subscribe: (messageHandler: Function, topic: string) => Promise<void>;
};
