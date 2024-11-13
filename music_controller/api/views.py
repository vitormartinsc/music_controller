from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Room
from .serializers import CreateRoomSerializer, RoomSerializer
from django.http import JsonResponse

def create_session_if_not_exist(request):
    if not request.session.exists(request.session.session_key):
            request.session.create()

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    
class UserInRoom(APIView):
    def get(self, request, format=None):
        create_session_if_not_exist(self.request)
        
        data = {
            'code': self.request.session.get('room_code')
        }
        
        return JsonResponse(data, status=status.HTTP_200_OK)
    
class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'
    
    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        
        if code != None:
            room = Room.objects.filter(code=code)
            
            if len(room) > 0:
                data = self.serializer_class(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            
            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'Code Parameter Not Found in Request'}, status=status.HTTP_400_BAD_REQUEST) 

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    
    def get(self, request, format=None):
        # Aqui você pode retornar dados de todas as salas (por exemplo, para exibir uma lista de salas)
        rooms = Room.objects.all()  # Aqui você pode personalizar a consulta, caso queira filtrar
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        # Se a sessão não existir, cria uma nova sessão
        create_session_if_not_exist(self.request)

        # Cria o serializer e valida os dados da requisição
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            guest_can_pause = serializer.validated_data.get('guest_can_pause')
            votes_to_skip = serializer.validated_data.get('votes_to_skip')
            host = self.request.session.session_key

            # Verifica se já existe uma sala para o host atual
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                update_fields = ['guest_can_pause', 'votes_to_skip']
            else:
                # Cria uma nova sala
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                update_fields = None
                
            self.request.session['room_code'] = room.code
            room.save(update_fields=update_fields)
            # Retorna a resposta com os dados da sala
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        
        # Se o serializer não for válido, retorna um erro
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class JoinRoom(APIView):
    lookup_url_kwarg = 'code'
    
    def post(self, request, format=None):
        create_session_if_not_exist(self.request)
        
        code = request.data.get(self.lookup_url_kwarg)
        
        if code != None:
            room_result = Room.objects.filter(code=code)
            
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)
            
            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({'Bad Request': 'Invalid Post Data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)

class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            del self.request.session['room_code']
        
        return Response({'message': 'Room Left!'}, status=status.HTTP_204_NO_CONTENT)
        
