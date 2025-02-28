import { IoShareSocialOutline } from 'react-icons/io5'
import styled from 'styled-components'
import Tag from './common/Tag';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDateTime } from '@/utils/formatDate';

interface FutureReservationProps {
   designerProfile: string;
   designerName: string;
   address: string;
   region: string;
   meetingType: string;
   reservationDate: string;
   //meetUrl의 기본값은 빈 문자열
   meetUrl: string;
   reservationId: string;
}


const FutureReservation: React.FC<FutureReservationProps> = ({ designerProfile, designerName, address, region, meetingType, reservationDate, meetUrl="", reservationId }) => {
   const [isConsultingMeet, setIsConsultingMeet] = useState(false); //화상 미팅인지 대면 미팅인지
   const router = useRouter();
   const [formattedDate, setFormattedDate] = useState<string>("");

   const handleReservationDetail = (reservationId: string) => {
      console.log("예약 상세 페이지로 이동");
      router.push(`/reservation/${reservationId}`);
   }

   useEffect(() => {
      if(meetingType === "ONLINE") {
         setIsConsultingMeet(true);
      }
      setFormattedDate(formatDateTime(reservationDate));
      console.log("address:", address);
      console.log("region:", region);
   }, [meetingType, address, region, reservationDate])

   return (
      <ProfileContainer>
         <TopProfile>
            <ProfileImage src={designerProfile}/>
            <NameAndAddress>
               <Name>{designerName}</Name>
               <Address>
                  <span id='address_detail' style={{marginRight:'10px'}}>{address}</span>
                  <span id='address_category' style={{color: '#808080'}}>{region}</span>
               </Address>
            </NameAndAddress>
         </TopProfile> 
         {/* 여기까지 공통 */}
         <BottomProfile>   
            <ConsultingAndTime>
               <Consulting>
                  <SmallTitle>컨설팅 유형</SmallTitle>
                  {meetingType === "OFFLINE" ? <Tag type='consulting' text='대면' /> : <Tag type='consulting' text='화상' />}
               </Consulting>
               <Time>
                  <SmallTitle>예약 시간</SmallTitle>
                  <span style={{fontSize:'16px'}}>{formattedDate}</span>
               </Time>
            </ConsultingAndTime>
            {/* 화상일때만 출력 */}
            {isConsultingMeet && 
               <MeetingLink>
                  <SmallTitle>미팅 링크(시간에 맞춰 접속해주세요)</SmallTitle>
                  <GrayBox>
                     <IoShareSocialOutline style={{fontSize:'20px'}} />
                     <span onClick={()=>window.open('https://meet.google.com/rqb-uemg-eeh')} style={{textDecoration:'underline', color:'#333'}}>화상 컨설팅 바로가기</span>
                  </GrayBox>
               </MeetingLink>
            }
            <Informations>
               <GrayBox onClick={()=>handleReservationDetail(reservationId)}>예약정보</GrayBox>
               {/* <GrayBox>결제정보</GrayBox> */}
            </Informations>
         </BottomProfile>
      </ProfileContainer>
   )
}

export default FutureReservation

const ProfileContainer = styled.div`
   width: 95%;
   padding: 25px;
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   border-radius: 6px;
   background-color: #ffffff; 
`

const TopProfile = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;

   align-self: flex-start;
`


const ProfileImage = styled.img`
   width: 55px;
   aspect-ratio: 1/1;
   border-radius: 50%;
   object-fit: cover;
   object-position: center ;
`

const NameAndAddress = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: space-between;
   margin-left: 20px;
   padding: 5px 0;
   box-sizing: border-box;
   gap: 5px;
`

const Name = styled.div`
   font-size: 18px;
   font-weight: bold;   
`

const Address = styled.div`
   font-size: 13px;
`


//////
const BottomProfile = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   margin-top: 18px;

`


const ConsultingAndTime = styled.div`
   width: 100%;
   height: 60px;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;
   gap: 20px;
`

const Consulting = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: space-between;
`

const Time = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: space-between;
`

const SmallTitle = styled.div`
   font-size: 13px;
   font-weight: bold;
   margin-bottom: 10px;
   color: #5f5f5f;
`

const MeetingLink = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: center;
   margin-top: 20px;
`

const Informations = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   gap: 10px;
   margin-top: 20px;
`

const GrayBox = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;
   gap: 10px;
   padding: 15px 10px;
   border-radius: 6px;
   box-sizing: border-box;
   background-color: #f0f0f0;
   font-size: 15px;
   cursor:pointer;
   font-weight: bold;

   //hover
   &:hover {
      background-color: #e0e0e0;
   }
`
