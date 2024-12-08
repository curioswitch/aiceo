
�&
frontendapi/frontend.protofrontendapi"�
Chat
id (	Rid 
description (	Rdescription+
gender (2.frontendapi.GenderRgender8
ceo_details (2.frontendapi.CEODetailsR
ceoDetails"
GetChatsRequest";
GetChatsResponse'
chats (2.frontendapi.ChatRchats"P

CEODetails
key (	Rkey
advice (	Radvice
summary (	Rsummary"�
ChatMessage
id (	Rid
message (	Rmessage
is_user (RisUser
choices (	Rchoices8
ceo_details (2.frontendapi.CEODetailsR
ceoDetails"
StartChatRequest"`
StartChatResponse
chat_id (	RchatId2
message (2.frontendapi.ChatMessageRmessage"1
GetChatMessagesRequest
chat_id (	RchatId"O
GetChatMessagesResponse4
messages (2.frontendapi.ChatMessageRmessages"G
SendMessageRequest
chat_id (	RchatId
message (	Rmessage"K
SendMessageResponse4
messages (2.frontendapi.ChatMessageRmessages*V
Gender
GENDER_UNSPECIFIED 
GENDER_MALE
GENDER_FEMALE
GENDER_OTHER2�
FrontendServiceG
GetChats.frontendapi.GetChatsRequest.frontendapi.GetChatsResponseJ
	StartChat.frontendapi.StartChatRequest.frontendapi.StartChatResponse\
GetChatMessages#.frontendapi.GetChatMessagesRequest$.frontendapi.GetChatMessagesResponseP
SendMessage.frontendapi.SendMessageRequest .frontendapi.SendMessageResponseB1Z/github.com/curioswitch/aiceo/api/go;frontendapiJ�
  

  

 

 F
	
 F

   A user gender.



 
'
  	 Gender has not been set.


  	

  	

  Male.


 

 

 	 Female.


 

 

  Other.


 

 
*
  " Details about a single chat.



 
"
   The ID of the chat.


  

  	

  
=
 "0 The description of the chat as a set of parts.


 


 

 

  !
;
 . The gender of the user initiaiting the chat.


 

 	

 
E
 !&8 Details of CEOs to presented to the user in this chat.


 !


 !

 !!

 !$%
(
%  A request to get all chats.



%
7
( ++ A response to a request to get all chats.



(
!
 * The fetched chats.


 *


 *

 *

 *

. 7 Details of a CEO.



.
:
 0- The key for the CEO for programmatic usage.


 0

 0	

 0
'
3 The advice from the CEO.


3

3	

3
2
6% The excerpt summary for the advice.


6

6	

6
4
: I( Details about a message within a chat.



:
%
 < The ID of the message.


 <

 <	

 <
/
?" The text content of the message.


?

?	

?
Y
BL Whether the message is from the user. Otherwise, it is from the assistant.


B

B

B
C
E6 Choices for the user to select from for the message.


E


E

E

E
6
H&) Details of CEOs to present to the user.


H


H

H!

H$%
/
L $ A request to begin a chat session.



L
>
O U2 A response to a request to begin a chat session.



O
&
 Q The ID of the new chat.


 Q

 Q	

 Q
/
T" The initial message of the chat.


T

T

T
2
X [& A request to get messages in a chat.



X
6
 Z) The ID of the chat to get messages for.


 Z

 Z	

 Z
@
^ a4 A response to a request to get messages in a chat.



^
(
 `$ The messages in the chat.


 `


 `

 `

 `"#
4
	d j( A request to send a message in a chat.



	d
9
	 f, The ID of the chat to send the message in.


	 f

	 f	

	 f
#
	i The message to send.


	i

	i	

	i
B

m p6 A response to a request to send a message in a chat.




m
W

 o$J New messages in the chat. This will include the request message as well.



 o



 o


 o


 o"#
+
 s  The service for the frontend.



 s

  u; Gets all chats.


  u

  u

  u)9
%
 x> Starts a chat session.


 x

 x 

 x+<
'
 {P Gets messages in a chat.


 {

 {,

 {7N
)
 ~D Sends a message in a chat.


 ~

 ~$

 ~/Bbproto3