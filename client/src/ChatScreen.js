import React, { useState, useCallback, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
  } from "react-native";
  //import { TextInput } from "react-native-gesture-handler";
  import { GiftedChat } from "react-native-gifted-chat";
  //import { url } from "../venv";
  //import * as Location from "expo-location";
  //import Spinner from "react-native-loading-spinner-overlay";


const ChatScreen = ({ navigation }) => { 
    const [messages, setMessages] = useState([]); //메세지들 상태관리
    const BOT_USER = {
      _id: 2, 
      name: "Bot",
      avatar: require('./robot.png'), //프로필이미지    
    };

    useEffect(() => { 
      setMessages([ 
        { //Message 형식
          _id: 1, // 메세지 정렬에 쓰이는 id
          text: "안녕하세요, Odego 챗봇입니다!"+ "\n" +"부산의 여행지, 맛집, 카페 관련 정보를 제공하고 있습니다:)"+ "\n" +"여행 계획도 세워드리고 있어요!", // 처음으로 보내는 메세지
          createdAt: new Date(), //생성시간
          user: BOT_USER,
        },
      ]);
    }, []);
    
      const onSend = useCallback( //보내기 버튼을 누르면 작동하는 함수
        (messages = []) => {
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
          );
          //console.log("ok");//GiftedChat의 append 기능을 사용햐여 새로운 메세지를 이전 메세지배열에 넣는다.
          const sendMessage = async () =>{
            try{
              const response = await fetch('https://d107-2001-e60-3176-7de7-3c98-ef80-6a21-da6c.ngrok-free.app/chatbot',
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    message: messages[0].text + ".",
                  }),
                }  
              );
              const data = await response.json();
              //console.log(data);
              //console.log(messages);
              sendBotResponse(data);  
              
            } catch (error){
              console.error(error);
            }
          };
          sendMessage();
          
        }, []
      );

      const sendBotResponse = (text) => {
        const msg = {
          _id: Date.now(),
          text: JSON.stringify(text["response"]).replace(/\"/gi, "").replace(/\\n/gm,'\n').trim(), //bot 대답
          createdAt: new Date(), 
          
          user: BOT_USER,
        };
        console.log(text);
        setMessages((previousMessages) => GiftedChat.append(previousMessages, msg));
      }

      function onBack() {
        navigation.navigate("Main");
      }
      function onReload() {
        navigation.navigate("Chat");
      }
      
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack}>
              <Text>뒤로</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Odego</Text>
            <TouchableOpacity onPress={onReload}>
              <Text>다시</Text>
            </TouchableOpacity>
          </View>
          <GiftedChat          
            placeholder={"메세지를 입력하세요"}
            alwaysShowSend={true}
            messages={messages}
            textInputProps={{ keyboardAppearance: "default", autoCorrect: false }}
            onSend={(messages) => onSend(messages)}
            minInputToolbarHeight = {50}
            //renderInputToolbar={this.renderInputToolbar}
            //onQuickReply={onQuickReply}
            user={{
              _id: 1,
            }}
          />
        </SafeAreaView>
      );
    };
    export default ChatScreen;

    const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        header: {
          width: "100%",
          height: "6%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 20,
          paddingRight: 20,
          marginBottom: 5,
        },
        title: {
          fontSize: 25,
          fontWeight: "500",
        },
        spinnerTextStyle: {
          color: "#FFF",
        },
      });

    
