import { Card, Group, Text, Badge } from "@mantine/core";
import { Video } from 'tabler-icons-react';
import { useRouter } from "next/router";

export default function VideoRec(props) {
  const router = useRouter();
  const handlerRecordings = () => {
    router.push({
      pathname: "/recordings",
      query: { topic: props.item.topic, id: props.item.id, video: props.item.video, trans: props.item.trans, rec: props.item.rec},
    });
  }
  return (
    <Card shadow="sm" padding="xs"  radius="md" onClick={ handlerRecordings}   withBorder style={{height: '100px', cursor: 'pointer' }}>
     
      <Group position="apart" mb="xs">
        
        <Card>  
        <Group position="apart">
          <Video size={35} />
          <Text weight={500} size="xl">{props.item.topic}</Text> 
          ➡<Text weight={500} size="lg">{props.item.id}</Text>
        </Group>
        <Text style={{marginLeft: '55px'}}>{props.item.start_time}</Text>
        </Card>
        <Badge variant="filled" color={props.item.rec == true ? "blue" : "pink"}>{props.item.rec == true ? "Recording available" : "Recording not available"}</Badge>
      </Group>
      

    </Card>
  );
}