FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app
COPY *.csproj ./
RUN dotnet restore
COPY ./ ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
EXPOSE 80
EXPOSE 443
ENV ConnectionStrings:PlansConnectionStrings="Server=172.17.0.3;Database=customerplansdb;User Id=sa;Password=Password@123;"
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "CustomerPlansAPI.dll"]
