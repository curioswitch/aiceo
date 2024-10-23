// @generated by protoc-gen-es v1.9.0 with parameter "target=ts"
// @generated from file frontendapi/frontend.proto (package frontendapi, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * Details about a message within a chat.
 *
 * @generated from message frontendapi.ChatMessage
 */
export class ChatMessage extends Message<ChatMessage> {
  /**
   * The ID of the message.
   *
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * The text content of the message.
   *
   * @generated from field: string message = 2;
   */
  message = "";

  /**
   * Choices for the user to select from for the message.
   *
   * @generated from field: repeated string choices = 3;
   */
  choices: string[] = [];

  /**
   * Whether the message is from the user. Otherwise, it is from the assistant.
   *
   * @generated from field: bool is_user = 4;
   */
  isUser = false;

  constructor(data?: PartialMessage<ChatMessage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "frontendapi.ChatMessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "choices", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 4, name: "is_user", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatMessage {
    return new ChatMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatMessage {
    return new ChatMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatMessage {
    return new ChatMessage().fromJsonString(jsonString, options);
  }

  static equals(a: ChatMessage | PlainMessage<ChatMessage> | undefined, b: ChatMessage | PlainMessage<ChatMessage> | undefined): boolean {
    return proto3.util.equals(ChatMessage, a, b);
  }
}

/**
 * A request to begin a chat session.
 *
 * @generated from message frontendapi.StartChatRequest
 */
export class StartChatRequest extends Message<StartChatRequest> {
  constructor(data?: PartialMessage<StartChatRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "frontendapi.StartChatRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StartChatRequest {
    return new StartChatRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StartChatRequest {
    return new StartChatRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StartChatRequest {
    return new StartChatRequest().fromJsonString(jsonString, options);
  }

  static equals(a: StartChatRequest | PlainMessage<StartChatRequest> | undefined, b: StartChatRequest | PlainMessage<StartChatRequest> | undefined): boolean {
    return proto3.util.equals(StartChatRequest, a, b);
  }
}

/**
 * A response to a request to begin a chat session.
 *
 * @generated from message frontendapi.StartChatResponse
 */
export class StartChatResponse extends Message<StartChatResponse> {
  /**
   * The ID of the new chat.
   *
   * @generated from field: string chat_id = 1;
   */
  chatId = "";

  /**
   * The initial message of the chat.
   *
   * @generated from field: frontendapi.ChatMessage message = 2;
   */
  message?: ChatMessage;

  constructor(data?: PartialMessage<StartChatResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "frontendapi.StartChatResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "chat_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "message", kind: "message", T: ChatMessage },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StartChatResponse {
    return new StartChatResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StartChatResponse {
    return new StartChatResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StartChatResponse {
    return new StartChatResponse().fromJsonString(jsonString, options);
  }

  static equals(a: StartChatResponse | PlainMessage<StartChatResponse> | undefined, b: StartChatResponse | PlainMessage<StartChatResponse> | undefined): boolean {
    return proto3.util.equals(StartChatResponse, a, b);
  }
}

/**
 * A request to get messages in a chat.
 *
 * @generated from message frontendapi.GetChatMessagesRequest
 */
export class GetChatMessagesRequest extends Message<GetChatMessagesRequest> {
  /**
   * The ID of the chat to get messages for.
   *
   * @generated from field: string chat_id = 1;
   */
  chatId = "";

  constructor(data?: PartialMessage<GetChatMessagesRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "frontendapi.GetChatMessagesRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "chat_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetChatMessagesRequest {
    return new GetChatMessagesRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetChatMessagesRequest {
    return new GetChatMessagesRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetChatMessagesRequest {
    return new GetChatMessagesRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetChatMessagesRequest | PlainMessage<GetChatMessagesRequest> | undefined, b: GetChatMessagesRequest | PlainMessage<GetChatMessagesRequest> | undefined): boolean {
    return proto3.util.equals(GetChatMessagesRequest, a, b);
  }
}

/**
 * A response to a request to get messages in a chat.
 *
 * @generated from message frontendapi.GetChatMessagesResponse
 */
export class GetChatMessagesResponse extends Message<GetChatMessagesResponse> {
  /**
   * The messages in the chat.
   *
   * @generated from field: repeated frontendapi.ChatMessage messages = 1;
   */
  messages: ChatMessage[] = [];

  constructor(data?: PartialMessage<GetChatMessagesResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "frontendapi.GetChatMessagesResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "messages", kind: "message", T: ChatMessage, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetChatMessagesResponse {
    return new GetChatMessagesResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetChatMessagesResponse {
    return new GetChatMessagesResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetChatMessagesResponse {
    return new GetChatMessagesResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetChatMessagesResponse | PlainMessage<GetChatMessagesResponse> | undefined, b: GetChatMessagesResponse | PlainMessage<GetChatMessagesResponse> | undefined): boolean {
    return proto3.util.equals(GetChatMessagesResponse, a, b);
  }
}

/**
 * A request to send a message in a chat.
 *
 * @generated from message frontendapi.SendMessageRequest
 */
export class SendMessageRequest extends Message<SendMessageRequest> {
  /**
   * The ID of the chat to send the message in.
   *
   * @generated from field: string chat_id = 1;
   */
  chatId = "";

  /**
   * The message to send.
   *
   * @generated from field: string message = 2;
   */
  message = "";

  constructor(data?: PartialMessage<SendMessageRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "frontendapi.SendMessageRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "chat_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SendMessageRequest {
    return new SendMessageRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SendMessageRequest {
    return new SendMessageRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SendMessageRequest {
    return new SendMessageRequest().fromJsonString(jsonString, options);
  }

  static equals(a: SendMessageRequest | PlainMessage<SendMessageRequest> | undefined, b: SendMessageRequest | PlainMessage<SendMessageRequest> | undefined): boolean {
    return proto3.util.equals(SendMessageRequest, a, b);
  }
}

/**
 * A response to a request to send a message in a chat.
 *
 * @generated from message frontendapi.SendMessageResponse
 */
export class SendMessageResponse extends Message<SendMessageResponse> {
  /**
   * New messages in the chat. This will include the request message as well.
   *
   * @generated from field: repeated frontendapi.ChatMessage messages = 1;
   */
  messages: ChatMessage[] = [];

  constructor(data?: PartialMessage<SendMessageResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "frontendapi.SendMessageResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "messages", kind: "message", T: ChatMessage, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SendMessageResponse {
    return new SendMessageResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SendMessageResponse {
    return new SendMessageResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SendMessageResponse {
    return new SendMessageResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SendMessageResponse | PlainMessage<SendMessageResponse> | undefined, b: SendMessageResponse | PlainMessage<SendMessageResponse> | undefined): boolean {
    return proto3.util.equals(SendMessageResponse, a, b);
  }
}

