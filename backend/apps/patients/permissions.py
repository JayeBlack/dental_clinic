from rest_framework import permissions, generics


class PatientPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        # Allow admin full access
        if request.user.role == 'admin':
            return True

        # Determine the action based on the view's method
        action = None
        if request.method == 'POST':
            action = 'create'
        elif request.method == 'GET':
            if isinstance(view, generics.RetrieveAPIView):
                action = 'retrieve'
            else:
                action = 'list'

        # Create: Only admin and receptionist
        if action == 'create':
            return request.user.role in ['admin', 'receptionist']

        # List/Retrieve: Allow admin, doctor, nurse
        if action in ['list', 'retrieve']:
            return request.user.role in ['admin', 'doctor', 'nurse']

        # Delete: Only admin
        if action == 'delete':
            return request.user.role == 'admin'

        return False
