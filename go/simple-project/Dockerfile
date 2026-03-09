FROM golang:1.26-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
ENV GOPROXY=https://proxy.golang.org,direct
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o workout-api main.go

FROM alpine:3.20
WORKDIR /app

COPY --from=builder /app/workout-api /usr/local/bin/workout-api

EXPOSE 8080

ENTRYPOINT ["workout-api"]

