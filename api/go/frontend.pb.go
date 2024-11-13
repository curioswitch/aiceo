// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.34.1
// 	protoc        (unknown)
// source: frontendapi/frontend.proto

package frontendapi

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// A user gender.
type Gender int32

const (
	// Gender has not been set.
	Gender_GENDER_UNSPECIFIED Gender = 0
	// Male.
	Gender_GENDER_MALE Gender = 1
	// Female.
	Gender_GENDER_FEMALE Gender = 2
	// Other.
	Gender_GENDER_OTHER Gender = 3
)

// Enum value maps for Gender.
var (
	Gender_name = map[int32]string{
		0: "GENDER_UNSPECIFIED",
		1: "GENDER_MALE",
		2: "GENDER_FEMALE",
		3: "GENDER_OTHER",
	}
	Gender_value = map[string]int32{
		"GENDER_UNSPECIFIED": 0,
		"GENDER_MALE":        1,
		"GENDER_FEMALE":      2,
		"GENDER_OTHER":       3,
	}
)

func (x Gender) Enum() *Gender {
	p := new(Gender)
	*p = x
	return p
}

func (x Gender) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (Gender) Descriptor() protoreflect.EnumDescriptor {
	return file_frontendapi_frontend_proto_enumTypes[0].Descriptor()
}

func (Gender) Type() protoreflect.EnumType {
	return &file_frontendapi_frontend_proto_enumTypes[0]
}

func (x Gender) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use Gender.Descriptor instead.
func (Gender) EnumDescriptor() ([]byte, []int) {
	return file_frontendapi_frontend_proto_rawDescGZIP(), []int{0}
}

// Details about a single chat.
type Chat struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// The ID of the chat.
	Id string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	// The description of the chat.
	Description string `protobuf:"bytes,2,opt,name=description,proto3" json:"description,omitempty"`
	// The gender of the user initiaiting the chat.
	Gender Gender `protobuf:"varint,3,opt,name=gender,proto3,enum=frontendapi.Gender" json:"gender,omitempty"`
	// Details of CEOs to presented to the user in this chat.
	CeoDetails []*CEODetails `protobuf:"bytes,4,rep,name=ceo_details,json=ceoDetails,proto3" json:"ceo_details,omitempty"`
}

func (x *Chat) Reset() {
	*x = Chat{}
	if protoimpl.UnsafeEnabled {
		mi := &file_frontendapi_frontend_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Chat) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Chat) ProtoMessage() {}

func (x *Chat) ProtoReflect() protoreflect.Message {
	mi := &file_frontendapi_frontend_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Chat.ProtoReflect.Descriptor instead.
func (*Chat) Descriptor() ([]byte, []int) {
	return file_frontendapi_frontend_proto_rawDescGZIP(), []int{0}
}

func (x *Chat) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *Chat) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

func (x *Chat) GetGender() Gender {
	if x != nil {
		return x.Gender
	}
	return Gender_GENDER_UNSPECIFIED
}

func (x *Chat) GetCeoDetails() []*CEODetails {
	if x != nil {
		return x.CeoDetails
	}
	return nil
}

// A request to get all chats.
type GetChatsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *GetChatsRequest) Reset() {
	*x = GetChatsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_frontendapi_frontend_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetChatsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetChatsRequest) ProtoMessage() {}

func (x *GetChatsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_frontendapi_frontend_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetChatsRequest.ProtoReflect.Descriptor instead.
func (*GetChatsRequest) Descriptor() ([]byte, []int) {
	return file_frontendapi_frontend_proto_rawDescGZIP(), []int{1}
}

// A response to a request to get all chats.
type GetChatsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// The fetched chats.
	Chats []*Chat `protobuf:"bytes,1,rep,name=chats,proto3" json:"chats,omitempty"`
}

func (x *GetChatsResponse) Reset() {
	*x = GetChatsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_frontendapi_frontend_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetChatsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetChatsResponse) ProtoMessage() {}

func (x *GetChatsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_frontendapi_frontend_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetChatsResponse.ProtoReflect.Descriptor instead.
func (*GetChatsResponse) Descriptor() ([]byte, []int) {
	return file_frontendapi_frontend_proto_rawDescGZIP(), []int{2}
}

func (x *GetChatsResponse) GetChats() []*Chat {
	if x != nil {
		return x.Chats
	}
	return nil
}

// Details of a CEO.
type CEODetails struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// The key for the CEO for programmatic usage.
	Key string `protobuf:"bytes,1,opt,name=key,proto3" json:"key,omitempty"`
	// The advice from the CEO.
	Advice string `protobuf:"bytes,2,opt,name=advice,proto3" json:"advice,omitempty"`
	// The excerpt summary for the advice.
	Summary string `protobuf:"bytes,3,opt,name=summary,proto3" json:"summary,omitempty"`
}

func (x *CEODetails) Reset() {
	*x = CEODetails{}
	if protoimpl.UnsafeEnabled {
		mi := &file_frontendapi_frontend_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CEODetails) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CEODetails) ProtoMessage() {}

func (x *CEODetails) ProtoReflect() protoreflect.Message {
	mi := &file_frontendapi_frontend_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CEODetails.ProtoReflect.Descriptor instead.
func (*CEODetails) Descriptor() ([]byte, []int) {
	return file_frontendapi_frontend_proto_rawDescGZIP(), []int{3}
}

func (x *CEODetails) GetKey() string {
	if x != nil {
		return x.Key
	}
	return ""
}

func (x *CEODetails) GetAdvice() string {
	if x != nil {
		return x.Advice
	}
	return ""
}

func (x *CEODetails) GetSummary() string {
	if x != nil {
		return x.Summary
	}
	return ""
}

// Details about a message within a chat.
type ChatMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// The ID of the message.
	Id string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	// The text content of the message.
	Message string `protobuf:"bytes,2,opt,name=message,proto3" json:"message,omitempty"`
	// Whether the message is from the user. Otherwise, it is from the assistant.
	IsUser bool `protobuf:"varint,3,opt,name=is_user,json=isUser,proto3" json:"is_user,omitempty"`
	// Choices for the user to select from for the message.
	Choices []string `protobuf:"bytes,4,rep,name=choices,proto3" json:"choices,omitempty"`
	// Details of CEOs to present to the user.
	CeoDetails []*CEODetails `protobuf:"bytes,5,rep,name=ceo_details,json=ceoDetails,proto3" json:"ceo_details,omitempty"`
}

func (x *ChatMessage) Reset() {
	*x = ChatMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_frontendapi_frontend_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ChatMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ChatMessage) ProtoMessage() {}

func (x *ChatMessage) ProtoReflect() protoreflect.Message {
	mi := &file_frontendapi_frontend_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ChatMessage.ProtoReflect.Descriptor instead.
func (*ChatMessage) Descriptor() ([]byte, []int) {
	return file_frontendapi_frontend_proto_rawDescGZIP(), []int{4}
}

func (x *ChatMessage) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *ChatMessage) GetMessage() string {
	if x != nil {
		return x.Message
	}
	return ""
}

func (x *ChatMessage) GetIsUser() bool {
	if x != nil {
		return x.IsUser
	}
	return false
}

func (x *ChatMessage) GetChoices() []string {
	if x != nil {
		return x.Choices
	}
	return nil
}

func (x *ChatMessage) GetCeoDetails() []*CEODetails {
	if x != nil {
		return x.CeoDetails
	}
	return nil
}

// A request to begin a chat session.
type StartChatRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *StartChatRequest) Reset() {
	*x = StartChatRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_frontendapi_frontend_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *StartChatRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*StartChatRequest) ProtoMessage() {}

func (x *StartChatRequest) ProtoReflect() protoreflect.Message {
	mi := &file_frontendapi_frontend_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use StartChatRequest.ProtoReflect.Descriptor instead.
func (*StartChatRequest) Descriptor() ([]byte, []int) {
	return file_frontendapi_frontend_proto_rawDescGZIP(), []int{5}
}

// A response to a request to begin a chat session.
type StartChatResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// The ID of the new chat.
	ChatId string `protobuf:"bytes,1,opt,name=chat_id,json=chatId,proto3" json:"chat_id,omitempty"`
	// The initial message of the chat.
	Message *ChatMessage `protobuf:"bytes,2,opt,name=message,proto3" json:"message,omitempty"`
}

func (x *StartChatResponse) Reset() {
	*x = StartChatResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_frontendapi_frontend_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *StartChatResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*StartChatResponse) ProtoMessage() {}

func (x *StartChatResponse) ProtoReflect() protoreflect.Message {
	mi := &file_frontendapi_frontend_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use StartChatResponse.ProtoReflect.Descriptor instead.
func (*StartChatResponse) Descriptor() ([]byte, []int) {
	return file_frontendapi_frontend_proto_rawDescGZIP(), []int{6}
}

func (x *StartChatResponse) GetChatId() string {
	if x != nil {
		return x.ChatId
	}
	return ""
}

func (x *StartChatResponse) GetMessage() *ChatMessage {
	if x != nil {
		return x.Message
	}
	return nil
}

// A request to get messages in a chat.
type GetChatMessagesRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// The ID of the chat to get messages for.
	ChatId string `protobuf:"bytes,1,opt,name=chat_id,json=chatId,proto3" json:"chat_id,omitempty"`
}

func (x *GetChatMessagesRequest) Reset() {
	*x = GetChatMessagesRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_frontendapi_frontend_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetChatMessagesRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetChatMessagesRequest) ProtoMessage() {}

func (x *GetChatMessagesRequest) ProtoReflect() protoreflect.Message {
	mi := &file_frontendapi_frontend_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetChatMessagesRequest.ProtoReflect.Descriptor instead.
func (*GetChatMessagesRequest) Descriptor() ([]byte, []int) {
	return file_frontendapi_frontend_proto_rawDescGZIP(), []int{7}
}

func (x *GetChatMessagesRequest) GetChatId() string {
	if x != nil {
		return x.ChatId
	}
	return ""
}

// A response to a request to get messages in a chat.
type GetChatMessagesResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// The messages in the chat.
	Messages []*ChatMessage `protobuf:"bytes,1,rep,name=messages,proto3" json:"messages,omitempty"`
}

func (x *GetChatMessagesResponse) Reset() {
	*x = GetChatMessagesResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_frontendapi_frontend_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetChatMessagesResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetChatMessagesResponse) ProtoMessage() {}

func (x *GetChatMessagesResponse) ProtoReflect() protoreflect.Message {
	mi := &file_frontendapi_frontend_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetChatMessagesResponse.ProtoReflect.Descriptor instead.
func (*GetChatMessagesResponse) Descriptor() ([]byte, []int) {
	return file_frontendapi_frontend_proto_rawDescGZIP(), []int{8}
}

func (x *GetChatMessagesResponse) GetMessages() []*ChatMessage {
	if x != nil {
		return x.Messages
	}
	return nil
}

// A request to send a message in a chat.
type SendMessageRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// The ID of the chat to send the message in.
	ChatId string `protobuf:"bytes,1,opt,name=chat_id,json=chatId,proto3" json:"chat_id,omitempty"`
	// The message to send.
	Message string `protobuf:"bytes,2,opt,name=message,proto3" json:"message,omitempty"`
}

func (x *SendMessageRequest) Reset() {
	*x = SendMessageRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_frontendapi_frontend_proto_msgTypes[9]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SendMessageRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SendMessageRequest) ProtoMessage() {}

func (x *SendMessageRequest) ProtoReflect() protoreflect.Message {
	mi := &file_frontendapi_frontend_proto_msgTypes[9]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SendMessageRequest.ProtoReflect.Descriptor instead.
func (*SendMessageRequest) Descriptor() ([]byte, []int) {
	return file_frontendapi_frontend_proto_rawDescGZIP(), []int{9}
}

func (x *SendMessageRequest) GetChatId() string {
	if x != nil {
		return x.ChatId
	}
	return ""
}

func (x *SendMessageRequest) GetMessage() string {
	if x != nil {
		return x.Message
	}
	return ""
}

// A response to a request to send a message in a chat.
type SendMessageResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// New messages in the chat. This will include the request message as well.
	Messages []*ChatMessage `protobuf:"bytes,1,rep,name=messages,proto3" json:"messages,omitempty"`
}

func (x *SendMessageResponse) Reset() {
	*x = SendMessageResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_frontendapi_frontend_proto_msgTypes[10]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SendMessageResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SendMessageResponse) ProtoMessage() {}

func (x *SendMessageResponse) ProtoReflect() protoreflect.Message {
	mi := &file_frontendapi_frontend_proto_msgTypes[10]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SendMessageResponse.ProtoReflect.Descriptor instead.
func (*SendMessageResponse) Descriptor() ([]byte, []int) {
	return file_frontendapi_frontend_proto_rawDescGZIP(), []int{10}
}

func (x *SendMessageResponse) GetMessages() []*ChatMessage {
	if x != nil {
		return x.Messages
	}
	return nil
}

var File_frontendapi_frontend_proto protoreflect.FileDescriptor

var file_frontendapi_frontend_proto_rawDesc = []byte{
	0x0a, 0x1a, 0x66, 0x72, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x64, 0x61, 0x70, 0x69, 0x2f, 0x66, 0x72,
	0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x64, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0b, 0x66, 0x72,
	0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x64, 0x61, 0x70, 0x69, 0x22, 0x9f, 0x01, 0x0a, 0x04, 0x43, 0x68,
	0x61, 0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02,
	0x69, 0x64, 0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69, 0x6f,
	0x6e, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70,
	0x74, 0x69, 0x6f, 0x6e, 0x12, 0x2b, 0x0a, 0x06, 0x67, 0x65, 0x6e, 0x64, 0x65, 0x72, 0x18, 0x03,
	0x20, 0x01, 0x28, 0x0e, 0x32, 0x13, 0x2e, 0x66, 0x72, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x64, 0x61,
	0x70, 0x69, 0x2e, 0x47, 0x65, 0x6e, 0x64, 0x65, 0x72, 0x52, 0x06, 0x67, 0x65, 0x6e, 0x64, 0x65,
	0x72, 0x12, 0x38, 0x0a, 0x0b, 0x63, 0x65, 0x6f, 0x5f, 0x64, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73,
	0x18, 0x04, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x17, 0x2e, 0x66, 0x72, 0x6f, 0x6e, 0x74, 0x65, 0x6e,
	0x64, 0x61, 0x70, 0x69, 0x2e, 0x43, 0x45, 0x4f, 0x44, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73, 0x52,
	0x0a, 0x63, 0x65, 0x6f, 0x44, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73, 0x22, 0x11, 0x0a, 0x0f, 0x47,
	0x65, 0x74, 0x43, 0x68, 0x61, 0x74, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x3b,
	0x0a, 0x10, 0x47, 0x65, 0x74, 0x43, 0x68, 0x61, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x12, 0x27, 0x0a, 0x05, 0x63, 0x68, 0x61, 0x74, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28,
	0x0b, 0x32, 0x11, 0x2e, 0x66, 0x72, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x64, 0x61, 0x70, 0x69, 0x2e,
	0x43, 0x68, 0x61, 0x74, 0x52, 0x05, 0x63, 0x68, 0x61, 0x74, 0x73, 0x22, 0x50, 0x0a, 0x0a, 0x43,
	0x45, 0x4f, 0x44, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73, 0x12, 0x10, 0x0a, 0x03, 0x6b, 0x65, 0x79,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x12, 0x16, 0x0a, 0x06, 0x61,
	0x64, 0x76, 0x69, 0x63, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x61, 0x64, 0x76,
	0x69, 0x63, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x73, 0x75, 0x6d, 0x6d, 0x61, 0x72, 0x79, 0x18, 0x03,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x73, 0x75, 0x6d, 0x6d, 0x61, 0x72, 0x79, 0x22, 0xa4, 0x01,
	0x0a, 0x0b, 0x43, 0x68, 0x61, 0x74, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x0e, 0x0a,
	0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x18, 0x0a,
	0x07, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07,
	0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x17, 0x0a, 0x07, 0x69, 0x73, 0x5f, 0x75, 0x73,
	0x65, 0x72, 0x18, 0x03, 0x20, 0x01, 0x28, 0x08, 0x52, 0x06, 0x69, 0x73, 0x55, 0x73, 0x65, 0x72,
	0x12, 0x18, 0x0a, 0x07, 0x63, 0x68, 0x6f, 0x69, 0x63, 0x65, 0x73, 0x18, 0x04, 0x20, 0x03, 0x28,
	0x09, 0x52, 0x07, 0x63, 0x68, 0x6f, 0x69, 0x63, 0x65, 0x73, 0x12, 0x38, 0x0a, 0x0b, 0x63, 0x65,
	0x6f, 0x5f, 0x64, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73, 0x18, 0x05, 0x20, 0x03, 0x28, 0x0b, 0x32,
	0x17, 0x2e, 0x66, 0x72, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x64, 0x61, 0x70, 0x69, 0x2e, 0x43, 0x45,
	0x4f, 0x44, 0x65, 0x74, 0x61, 0x69, 0x6c, 0x73, 0x52, 0x0a, 0x63, 0x65, 0x6f, 0x44, 0x65, 0x74,
	0x61, 0x69, 0x6c, 0x73, 0x22, 0x12, 0x0a, 0x10, 0x53, 0x74, 0x61, 0x72, 0x74, 0x43, 0x68, 0x61,
	0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x60, 0x0a, 0x11, 0x53, 0x74, 0x61, 0x72,
	0x74, 0x43, 0x68, 0x61, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x17, 0x0a,
	0x07, 0x63, 0x68, 0x61, 0x74, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06,
	0x63, 0x68, 0x61, 0x74, 0x49, 0x64, 0x12, 0x32, 0x0a, 0x07, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67,
	0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x18, 0x2e, 0x66, 0x72, 0x6f, 0x6e, 0x74, 0x65,
	0x6e, 0x64, 0x61, 0x70, 0x69, 0x2e, 0x43, 0x68, 0x61, 0x74, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67,
	0x65, 0x52, 0x07, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x22, 0x31, 0x0a, 0x16, 0x47, 0x65,
	0x74, 0x43, 0x68, 0x61, 0x74, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x73, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x12, 0x17, 0x0a, 0x07, 0x63, 0x68, 0x61, 0x74, 0x5f, 0x69, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x63, 0x68, 0x61, 0x74, 0x49, 0x64, 0x22, 0x4f, 0x0a,
	0x17, 0x47, 0x65, 0x74, 0x43, 0x68, 0x61, 0x74, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x73,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x34, 0x0a, 0x08, 0x6d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x18, 0x2e, 0x66, 0x72, 0x6f,
	0x6e, 0x74, 0x65, 0x6e, 0x64, 0x61, 0x70, 0x69, 0x2e, 0x43, 0x68, 0x61, 0x74, 0x4d, 0x65, 0x73,
	0x73, 0x61, 0x67, 0x65, 0x52, 0x08, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x73, 0x22, 0x47,
	0x0a, 0x12, 0x53, 0x65, 0x6e, 0x64, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x12, 0x17, 0x0a, 0x07, 0x63, 0x68, 0x61, 0x74, 0x5f, 0x69, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x63, 0x68, 0x61, 0x74, 0x49, 0x64, 0x12, 0x18, 0x0a,
	0x07, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07,
	0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x22, 0x4b, 0x0a, 0x13, 0x53, 0x65, 0x6e, 0x64, 0x4d,
	0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x34,
	0x0a, 0x08, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b,
	0x32, 0x18, 0x2e, 0x66, 0x72, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x64, 0x61, 0x70, 0x69, 0x2e, 0x43,
	0x68, 0x61, 0x74, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x52, 0x08, 0x6d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x73, 0x2a, 0x56, 0x0a, 0x06, 0x47, 0x65, 0x6e, 0x64, 0x65, 0x72, 0x12, 0x16,
	0x0a, 0x12, 0x47, 0x45, 0x4e, 0x44, 0x45, 0x52, 0x5f, 0x55, 0x4e, 0x53, 0x50, 0x45, 0x43, 0x49,
	0x46, 0x49, 0x45, 0x44, 0x10, 0x00, 0x12, 0x0f, 0x0a, 0x0b, 0x47, 0x45, 0x4e, 0x44, 0x45, 0x52,
	0x5f, 0x4d, 0x41, 0x4c, 0x45, 0x10, 0x01, 0x12, 0x11, 0x0a, 0x0d, 0x47, 0x45, 0x4e, 0x44, 0x45,
	0x52, 0x5f, 0x46, 0x45, 0x4d, 0x41, 0x4c, 0x45, 0x10, 0x02, 0x12, 0x10, 0x0a, 0x0c, 0x47, 0x45,
	0x4e, 0x44, 0x45, 0x52, 0x5f, 0x4f, 0x54, 0x48, 0x45, 0x52, 0x10, 0x03, 0x32, 0xd6, 0x02, 0x0a,
	0x0f, 0x46, 0x72, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x64, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
	0x12, 0x47, 0x0a, 0x08, 0x47, 0x65, 0x74, 0x43, 0x68, 0x61, 0x74, 0x73, 0x12, 0x1c, 0x2e, 0x66,
	0x72, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x64, 0x61, 0x70, 0x69, 0x2e, 0x47, 0x65, 0x74, 0x43, 0x68,
	0x61, 0x74, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1d, 0x2e, 0x66, 0x72, 0x6f,
	0x6e, 0x74, 0x65, 0x6e, 0x64, 0x61, 0x70, 0x69, 0x2e, 0x47, 0x65, 0x74, 0x43, 0x68, 0x61, 0x74,
	0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x4a, 0x0a, 0x09, 0x53, 0x74, 0x61,
	0x72, 0x74, 0x43, 0x68, 0x61, 0x74, 0x12, 0x1d, 0x2e, 0x66, 0x72, 0x6f, 0x6e, 0x74, 0x65, 0x6e,
	0x64, 0x61, 0x70, 0x69, 0x2e, 0x53, 0x74, 0x61, 0x72, 0x74, 0x43, 0x68, 0x61, 0x74, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1e, 0x2e, 0x66, 0x72, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x64,
	0x61, 0x70, 0x69, 0x2e, 0x53, 0x74, 0x61, 0x72, 0x74, 0x43, 0x68, 0x61, 0x74, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x5c, 0x0a, 0x0f, 0x47, 0x65, 0x74, 0x43, 0x68, 0x61, 0x74,
	0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x73, 0x12, 0x23, 0x2e, 0x66, 0x72, 0x6f, 0x6e, 0x74,
	0x65, 0x6e, 0x64, 0x61, 0x70, 0x69, 0x2e, 0x47, 0x65, 0x74, 0x43, 0x68, 0x61, 0x74, 0x4d, 0x65,
	0x73, 0x73, 0x61, 0x67, 0x65, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x24, 0x2e,
	0x66, 0x72, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x64, 0x61, 0x70, 0x69, 0x2e, 0x47, 0x65, 0x74, 0x43,
	0x68, 0x61, 0x74, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x12, 0x50, 0x0a, 0x0b, 0x53, 0x65, 0x6e, 0x64, 0x4d, 0x65, 0x73, 0x73, 0x61,
	0x67, 0x65, 0x12, 0x1f, 0x2e, 0x66, 0x72, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x64, 0x61, 0x70, 0x69,
	0x2e, 0x53, 0x65, 0x6e, 0x64, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x1a, 0x20, 0x2e, 0x66, 0x72, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x64, 0x61, 0x70,
	0x69, 0x2e, 0x53, 0x65, 0x6e, 0x64, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0x31, 0x5a, 0x2f, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e,
	0x63, 0x6f, 0x6d, 0x2f, 0x63, 0x75, 0x72, 0x69, 0x6f, 0x73, 0x77, 0x69, 0x74, 0x63, 0x68, 0x2f,
	0x61, 0x69, 0x63, 0x65, 0x6f, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x67, 0x6f, 0x3b, 0x66, 0x72, 0x6f,
	0x6e, 0x74, 0x65, 0x6e, 0x64, 0x61, 0x70, 0x69, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_frontendapi_frontend_proto_rawDescOnce sync.Once
	file_frontendapi_frontend_proto_rawDescData = file_frontendapi_frontend_proto_rawDesc
)

func file_frontendapi_frontend_proto_rawDescGZIP() []byte {
	file_frontendapi_frontend_proto_rawDescOnce.Do(func() {
		file_frontendapi_frontend_proto_rawDescData = protoimpl.X.CompressGZIP(file_frontendapi_frontend_proto_rawDescData)
	})
	return file_frontendapi_frontend_proto_rawDescData
}

var file_frontendapi_frontend_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_frontendapi_frontend_proto_msgTypes = make([]protoimpl.MessageInfo, 11)
var file_frontendapi_frontend_proto_goTypes = []interface{}{
	(Gender)(0),                     // 0: frontendapi.Gender
	(*Chat)(nil),                    // 1: frontendapi.Chat
	(*GetChatsRequest)(nil),         // 2: frontendapi.GetChatsRequest
	(*GetChatsResponse)(nil),        // 3: frontendapi.GetChatsResponse
	(*CEODetails)(nil),              // 4: frontendapi.CEODetails
	(*ChatMessage)(nil),             // 5: frontendapi.ChatMessage
	(*StartChatRequest)(nil),        // 6: frontendapi.StartChatRequest
	(*StartChatResponse)(nil),       // 7: frontendapi.StartChatResponse
	(*GetChatMessagesRequest)(nil),  // 8: frontendapi.GetChatMessagesRequest
	(*GetChatMessagesResponse)(nil), // 9: frontendapi.GetChatMessagesResponse
	(*SendMessageRequest)(nil),      // 10: frontendapi.SendMessageRequest
	(*SendMessageResponse)(nil),     // 11: frontendapi.SendMessageResponse
}
var file_frontendapi_frontend_proto_depIdxs = []int32{
	0,  // 0: frontendapi.Chat.gender:type_name -> frontendapi.Gender
	4,  // 1: frontendapi.Chat.ceo_details:type_name -> frontendapi.CEODetails
	1,  // 2: frontendapi.GetChatsResponse.chats:type_name -> frontendapi.Chat
	4,  // 3: frontendapi.ChatMessage.ceo_details:type_name -> frontendapi.CEODetails
	5,  // 4: frontendapi.StartChatResponse.message:type_name -> frontendapi.ChatMessage
	5,  // 5: frontendapi.GetChatMessagesResponse.messages:type_name -> frontendapi.ChatMessage
	5,  // 6: frontendapi.SendMessageResponse.messages:type_name -> frontendapi.ChatMessage
	2,  // 7: frontendapi.FrontendService.GetChats:input_type -> frontendapi.GetChatsRequest
	6,  // 8: frontendapi.FrontendService.StartChat:input_type -> frontendapi.StartChatRequest
	8,  // 9: frontendapi.FrontendService.GetChatMessages:input_type -> frontendapi.GetChatMessagesRequest
	10, // 10: frontendapi.FrontendService.SendMessage:input_type -> frontendapi.SendMessageRequest
	3,  // 11: frontendapi.FrontendService.GetChats:output_type -> frontendapi.GetChatsResponse
	7,  // 12: frontendapi.FrontendService.StartChat:output_type -> frontendapi.StartChatResponse
	9,  // 13: frontendapi.FrontendService.GetChatMessages:output_type -> frontendapi.GetChatMessagesResponse
	11, // 14: frontendapi.FrontendService.SendMessage:output_type -> frontendapi.SendMessageResponse
	11, // [11:15] is the sub-list for method output_type
	7,  // [7:11] is the sub-list for method input_type
	7,  // [7:7] is the sub-list for extension type_name
	7,  // [7:7] is the sub-list for extension extendee
	0,  // [0:7] is the sub-list for field type_name
}

func init() { file_frontendapi_frontend_proto_init() }
func file_frontendapi_frontend_proto_init() {
	if File_frontendapi_frontend_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_frontendapi_frontend_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Chat); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_frontendapi_frontend_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetChatsRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_frontendapi_frontend_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetChatsResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_frontendapi_frontend_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CEODetails); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_frontendapi_frontend_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ChatMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_frontendapi_frontend_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*StartChatRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_frontendapi_frontend_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*StartChatResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_frontendapi_frontend_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetChatMessagesRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_frontendapi_frontend_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetChatMessagesResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_frontendapi_frontend_proto_msgTypes[9].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SendMessageRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_frontendapi_frontend_proto_msgTypes[10].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SendMessageResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_frontendapi_frontend_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   11,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_frontendapi_frontend_proto_goTypes,
		DependencyIndexes: file_frontendapi_frontend_proto_depIdxs,
		EnumInfos:         file_frontendapi_frontend_proto_enumTypes,
		MessageInfos:      file_frontendapi_frontend_proto_msgTypes,
	}.Build()
	File_frontendapi_frontend_proto = out.File
	file_frontendapi_frontend_proto_rawDesc = nil
	file_frontendapi_frontend_proto_goTypes = nil
	file_frontendapi_frontend_proto_depIdxs = nil
}
