from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from rest_framework import generics,viewsets,status,mixins
from rest_framework.response import Response
from .serializers import StockoutwardSerializer,SalesSerializer,MenuitemSerializer
from .models import Stockoutward,Sales,Menuitems
# Create your views here.
class StockoutwardViewSet(mixins.ListModelMixin,viewsets.GenericViewSet):
    # serializer_class=StockoutwardSerializer
    # filter_backends=[DjangoFilterBackend]
    # filterset_fields=['itemname','itemunit','hsncode']
    # def get_queryset(self):
    #     user=self.request.user
    #     return Stockitems.objects.filter(author=user)
    # def list(self,request):
    #     serializer=StockitemsSerializer(Stockitems.objects.filter(author=self.request.user),many=True)
    #     # serializer=StockitemsSerializer(self.queryset,many=True)
    #     respond={
    #         'columns':["Item Name","Item Unit","Opening Qty","Opening Value","HSN Code","CGST","SGST","IGST"],
    #         'reportfields':["itemname","itemunit","openingqty","openingvalue","hsncode","cgst","sgst","igst"],
    #         'status':status.HTTP_200_OK,
    #         'message':'Stock Items',
    #         'response':serializer.data
    #     }
    #     return Response(respond)
    def list(self,request):
        serializer=StockoutwardSerializer(Stockoutward.objects.all(),many=True)
        # serializer=StockitemsSerializer(self.queryset,many=True)
        respond={
            'columns':[
                {"title":"Date","data":"vdate"},
                {"title":"Memo No.","data":"voucher_no"},
                {"title":"Item Name","data":"item_name"},
                {"title":"Vehicle No.","data":"display_name"},
                {"title":"Qty","data":"qty"},
                {"title":"Rate","data":"rate"},
                {"title":"Amount","data":"amount"}
                ],
            'status':status.HTTP_200_OK,
            'message':'Challan Register',
            'response':serializer.data
        }
        return Response(respond)

class MenuitemsViewSet(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class=MenuitemSerializer
    def list(self,request):
        serializer=MenuitemSerializer(Menuitems.objects.all().order_by('menuorder'),many=True)
        respond={
            'response':serializer.data
        }
        return Response(respond)
class SalesFilter(filters.FilterSet):
    # vdate_before=filters.DateRangeFilter(name='vdate')

    class Meta:
        model=Sales
        # fields=['vdate',]
        fields={
            'vdate':['lte','gte'],'voucher_no':['exact'],
        }
class SalesView(generics.ListAPIView):
    filter_backends=[DjangoFilterBackend]
    serializer_class=SalesSerializer
    queryset=Sales.objects.all().order_by('vdate')
    filter_class=SalesFilter
    def list(self,request):
        serializer=SalesSerializer(self.filter_queryset(Sales.objects.filter(author=self.request.user)),many=True)
        respond={
            'columns':[
                {"title":"Date","data":"vdate","name":"vdate"},
                {"title":"Date","data":"ddate","name":"ddate"},
                {"title":"Particulars","data":"particulars","name":"particulars"},
                {"title":"Voucher No.","data":"voucher_no","name":"voucher_no"},
                {"title":"Amount","data":"debit","name":"debit"}                
                ],
            'columndefs':[
                {"className":"sum text-right","targets":[4]},{"className":"text-center","targets":[1,3]},
                {"type":"num","targets":[3,4]},{"type":"date","targets":[0]},
                {"orderData":[0,1],"targets":1},
                {"visible":False,"targets":0},{"searchable":False,"targets":0}
                ],
            'order':[[0,'asc'],[3,'asc']],
            'pagelength':100,
            'status':status.HTTP_200_OK,
            'message':'Sales Register',
            'response':serializer.data
        }
        return Response(respond)        
