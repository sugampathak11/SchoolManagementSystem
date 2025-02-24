from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, generics
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from .serializers import (
    LoginSerializer, RegisterUserSerializer, UserSerializer, StudentSerializer, TeacherSerializer
)
from .models import CustomUser, Student, Teacher

# ✅ Login View (Ensures students can log in)
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]

            if not user:
                return Response({"detail": "Invalid username or password."}, status=status.HTTP_400_BAD_REQUEST)

            # ✅ Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "role": user.role,
                    "username": user.username,
                    "email": user.email,
                },
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Register View
class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Student Management Views (Admins Only)
class StudentListCreateView(generics.ListCreateAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """✅ Fetch all students stored in the database"""
        print("🔹 Fetching students list for:", self.request.user)  # ✅ Debugging
        return Student.objects.all().order_by("-created_at")

    def perform_create(self, serializer):
        """✅ Ensure only admins can add students & fix parent assignment"""
        if self.request.user.role != "admin":
            raise PermissionError("❌ Only admins can add students!")

        # ✅ Get Parent Info (If Provided)
        parent_username = self.request.data.get("parent", "").strip()
        parent = None
        if parent_username:
            parent = CustomUser.objects.filter(username=parent_username, role="parent").first()
            if not parent:
                raise ValueError(f"❌ Parent '{parent_username}' does not exist!")

        # ✅ Get Email & Password from Form
        student_username = self.request.data.get("username")
        student_email = self.request.data.get("email")
        student_password = self.request.data.get("password")

        # ✅ Ensure All Required Fields Are Provided
        if not student_username or not student_email or not student_password:
            raise ValueError("❌ Username, Email, and Password are required!")

        # ✅ Check if Student Already Exists
        if CustomUser.objects.filter(username=student_username).exists():
            raise ValueError("❌ Username already taken!")

        # ✅ Create Student User
        student_user = CustomUser.objects.create(
            username=student_username,
            email=student_email,
            role="student",
            password=make_password(student_password)
        )

        # ✅ Save Student Object & Assign Parent
        student = serializer.save(
            parent=parent,
            full_name=self.request.data.get("full_name"),
            grade=self.request.data.get("grade")
        )

        return Response(
            {
                "message": "✅ Student registered successfully!",
                "student_id": student_user.id,
                "username": student_user.username,
                "email": student_user.email,
                "password": student_password,
            },
            status=status.HTTP_201_CREATED,
        )

class StudentRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        """✅ Ensure only admins can delete students"""
        if request.user.role != "admin":
            return Response({"error": "❌ Only admins can delete students!"}, status=status.HTTP_403_FORBIDDEN)
        return super().delete(request, *args, **kwargs)

# ✅ Teacher Management Views
class TeacherListCreateView(generics.ListCreateAPIView):
    queryset = Teacher.objects.all().order_by("-created_at")
    serializer_class = TeacherSerializer
    permission_classes = [IsAuthenticated]

class TeacherRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [IsAuthenticated]
