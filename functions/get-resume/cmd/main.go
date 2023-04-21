package main

import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"log"
)

type Request struct {
	Id int `json:"Id"`
}

var client *dynamodb.Client

func init() {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("eu-west-1"))
	if err != nil {
		panic("configuration error, " + err.Error())
	}
	client = dynamodb.NewFromConfig(cfg)
}

type Response struct {
	Message string `json:"message"`
}

func HandleRequest(req Request) (Response, error) {
	resp, err := client.Scan(context.TODO(), &dynamodb.ScanInput{TableName: aws.String("TABLE_NAME")})
	if err != nil {
		log.Fatal("Failed to get resume data, %v", err)
	}
	return Response{}
}
func main() {
	lambda.Start(HandleRequest)
}
