//  ### react-native-image-picker 라이브러리 추가 ###

// 1) install
// 프로젝트폴더/ npm install react-native-image-picker

// 확인 방법 : package.json 문서의 dependencies에 추가되었는지 확인 [android의 build.gradle과 같은 역할]
// #######################################
import React,{Component} from "react";
import {View, Text, Button, Image, } from 'react-native'

// 외부 라이브러리 기능 사용
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default class Main extends Component{

    state={
        img:{uri:'https://cdn.pixabay.com/photo/2020/07/08/04/07/sea-5382487_1280.jpg'}
    }

    render(){
        return(
            <View style={{flex:1, padding:16, }}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Button title="show camera app" onPress={this.showCamera}></Button>
                    <Button title="show photo app" color='green' onPress={this.showPhoto}></Button>
                </View>

                <Text style={{margin:8,}}>{this.state.img.uri}</Text>
                <Image source={this.state.img} style={{marginTop:1, flex:1}}></Image>

            </View>
        )
    }

    // 카메라 앱을 실행시키는 기능을 가지는 콜백 함수
    showCamera=()=>{
        // 옵션 객체필요
        const options={
            mediaType:'photo',  // photo or video
            cameraType:'back',  // back or front
            saveToPhotos:true,  // 캡쳐한 사진을 디바이스에 저장할 것인가의 여부
            quality:1.0,        // 사진 화질 0.0~1.0
            videoQuality:'high' // 비디오 화질
        }

        // 카메라 앱 실행 함수 호출
        launchCamera(options, (response)=>{
            // 파라미터로 전달된 응답객체로부터 사진 캡쳐 결과 받기
            if(response.didCancel){
                alert('사용자가 사진 촬영을 취소하셨습니다.')
            }else  if(response.errorMessage){
                alert('에러가 발생 : ', response.errorMessage)
            }else {
                // 이 곳에 왔다면 사진 촬영이 잘 된 것임.
                // 선택된 이미지의 uri 경로를 얻어오기
                const source={uri:response.assets[0].uri}
                
                // 선택된 사진의 경로를 가진 객체 source를 이미지 컴포넌트가 보여주는
                // state값에 설정
                // this.state.img
                this.setState({img:source})
            }
        })
    }
    // 사진 앱을 실행시키는 기능을 가지는 콜백 함수
    showPhoto=()=>{
        // 옵션 객체
        const options ={
            mediaType:'photo',
            selectionLimi
        }

        launchImageLibrary(options,(response)=>{
            if(response.didCancel) alert('선택 취소')
            else if(response.errorMessage) alert('에러', response.errorMessage)
            else {
                // 사진 선택이 온전하게 되었다는 것임

                // 선택된 사진이미지의 경로를 기반으로 객체 만들기
                const source={uri:response.assets[0].uri}

                // 이미지 컴포넌트가 보여주는 state값에 설정
                this.setState({img:source})
            }

        })
    }
}
