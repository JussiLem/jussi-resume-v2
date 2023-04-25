package main

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"log"
	"os"
)

var client *dynamodb.Client

func init() {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("eu-west-1"))
	if err != nil {
		panic("configuration error, " + err.Error())
	}
	client = dynamodb.NewFromConfig(cfg)
}

type Response struct {
	Payload string `json:"payload"`
}

const (
	PKFormat = "Pk#%s"
)

func getItemFromDb(id string) (Response, error) {
	response := Response{}
	selectedKeys := map[string]string{
		"PK": fmt.Sprintf(PKFormat, id),
	}
	key, err := attributevalue.MarshalMap(selectedKeys)
	resp, err := client.GetItem(context.TODO(), &dynamodb.GetItemInput{
		TableName: aws.String(os.Getenv("TABLE_NAME")),
		Key:       key,
	})
	if err != nil {
		return response, fmt.Errorf("GetItem: Error happened while fetching data: %v\n", err)
	}
	if resp.Item == nil {
		return response, fmt.Errorf("GetItem: Data not found.\n")
	}
	err = attributevalue.UnmarshalMap(resp.Item, &response)
	if err != nil {
		return response, fmt.Errorf("UnmarshallMap Error: %v\n", err)
	}
	return response, nil
}

func HandleRequest(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	apiResponse := events.APIGatewayProxyResponse{}
	switch request.HTTPMethod {
	case "GET":
		id := request.QueryStringParameters["id"]
		if id != "" {
			itemFromDb, err := getItemFromDb(id)
			if err != nil {
				log.Print(fmt.Errorf("ERROR: %v", err))
				apiResponse = events.APIGatewayProxyResponse{
					StatusCode: 500,
					Body:       "Failed to get data from DB",
				}
			}
			apiResponse = events.APIGatewayProxyResponse{
				StatusCode: 200,
				Body:       itemFromDb.Payload,
			}
		} else {
			apiResponse = events.APIGatewayProxyResponse{
				Body:       "Error: Query Parameter name missing",
				StatusCode: 503,
			}

		}
		apiResponse = events.APIGatewayProxyResponse{
			Body:       "Error: wrong Http Method used",
			StatusCode: 503,
		}
	}
	return apiResponse, nil
}
func main() {
	lambda.Start(HandleRequest)
}
