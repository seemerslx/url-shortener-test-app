#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ShortenerUrlAPI/ShortenerUrlAPI.csproj", "ShortenerUrlAPI/"]
COPY ["UrlShortenerApi.Core/UrlShortenerApi.Core.csproj", "UrlShortenerApi.Core/"]
COPY ["UrlShortenerAPI.Models/UrlShortenerAPI.Models.csproj", "UrlShortenerAPI.Models/"]
RUN dotnet restore "./ShortenerUrlAPI/ShortenerUrlAPI.csproj"
COPY . .
WORKDIR "/src/ShortenerUrlAPI"
RUN dotnet build "./ShortenerUrlAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ShortenerUrlAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ShortenerUrlAPI.dll"]