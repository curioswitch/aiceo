// @generated by protoc-gen-connect-query v1.4.0 with parameter "target=ts"
// @generated from file frontendapi/frontend.proto (package frontendapi, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { MethodKind } from "@bufbuild/protobuf";
import { GetChatMessagesRequest, GetChatMessagesResponse, SendMessageRequest, SendMessageResponse, StartChatRequest, StartChatResponse } from "./frontend_pb.js";

/**
 * Starts a chat session.
 *
 * @generated from rpc frontendapi.FrontendService.StartChat
 */
export const startChat = {
  localName: "startChat",
  name: "StartChat",
  kind: MethodKind.Unary,
  I: StartChatRequest,
  O: StartChatResponse,
  service: {
    typeName: "frontendapi.FrontendService"
  }
} as const;

/**
 * Gets messages in a chat.
 *
 * @generated from rpc frontendapi.FrontendService.GetChatMessages
 */
export const getChatMessages = {
  localName: "getChatMessages",
  name: "GetChatMessages",
  kind: MethodKind.Unary,
  I: GetChatMessagesRequest,
  O: GetChatMessagesResponse,
  service: {
    typeName: "frontendapi.FrontendService"
  }
} as const;

/**
 * Sends a message in a chat.
 *
 * @generated from rpc frontendapi.FrontendService.SendMessage
 */
export const sendMessage = {
  localName: "sendMessage",
  name: "SendMessage",
  kind: MethodKind.Unary,
  I: SendMessageRequest,
  O: SendMessageResponse,
  service: {
    typeName: "frontendapi.FrontendService"
  }
} as const;
