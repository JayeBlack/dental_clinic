from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from decimal import Decimal
from .models import Invoice, Payment
from .serializers import InvoiceSerializer, PaymentSerializer
from backend.apps.appointments.permissions import AppointmentPermission

class InvoiceCreateView(generics.CreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [AppointmentPermission]

class InvoiceListView(generics.ListAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [AppointmentPermission]

class InvoiceRetrieveView(generics.RetrieveAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [AppointmentPermission]

class PaymentProcessView(generics.CreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [AppointmentPermission]

    def post(self, request, invoice_id, *args, **kwargs):
        try:
            invoice = Invoice.objects.get(id=invoice_id)
        except Invoice.DoesNotExist:
            return Response({"detail": "Invoice not found."}, status=status.HTTP_404_NOT_FOUND)

        amount = request.data.get('amount')
        payment_method = request.data.get('payment_method')

        # Validate payment amount as Decimal
        if Decimal(str(amount)) > invoice.amount_due:
            return Response({"detail": "Payment amount exceeds amount due."}, status=status.HTTP_400_BAD_REQUEST)

        # Handle cash payments only for now
        if payment_method == 'cash':
            payment = Payment.objects.create(
                invoice=invoice,
                amount=Decimal(str(amount)),
                payment_method=payment_method,
                payment_status='completed'
            )
            # Update invoice status and calculate new balance
            invoice.amount_due -= Decimal(str(amount))
            invoice.status = 'paid' if invoice.amount_due <= 0 else 'partially_paid'
            invoice.save()

            # Include updated balance in response
            payment_data = PaymentSerializer(payment).data
            payment_data['remaining_balance'] = float(invoice.amount_due)

            return Response(payment_data, status=status.HTTP_201_CREATED)

        return Response({"detail": "Only cash payments are supported at this time."}, status=status.HTTP_400_BAD_REQUEST)