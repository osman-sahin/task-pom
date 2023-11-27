package service

import (
	"be-paymentordermanagement/app/constant"
	"be-paymentordermanagement/app/model/dao"
	"be-paymentordermanagement/app/repository"
	"be-paymentordermanagement/app/util"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
	// "golang.org/x/crypto/bcrypt"
)

type PaymentService interface {
	GetAllPayment(c *gin.Context)
	GetPaymentById(c *gin.Context)
	AddPaymentData(c *gin.Context)
	UpdatePaymentData(c *gin.Context)
	DeletePayment(c *gin.Context)
}

type PaymentServiceImpl struct {
	paymentRepository repository.PaymentRepository
}

func (u PaymentServiceImpl) UpdatePaymentData(c *gin.Context) {
	defer util.PanicHandler(c)

	log.Info("start to execute program update payment data by id")
	paymentID, _ := uuid.Parse(c.Param("paymentID"))

	var request dao.Payment
	if err := c.ShouldBindJSON(&request); err != nil {
		log.Error("Happened error when mapping request from FE. Error", err)
		util.PanicException(constant.InvalidRequest)
	}

	data, err := u.paymentRepository.FindPaymentById(paymentID)
	if err != nil {
		log.Error("Happened error when get data from database. Error", err)
		util.PanicException(constant.DataNotFound)
	}

	data.ID = request.ID
	data.CreditorAccount = request.CreditorAccount
	data.DebtorAccount = request.DebtorAccount
	data.Amount = request.Amount
	data.Currency = request.Currency
	data.Date = request.Date
	u.paymentRepository.Save(&data)

	if err != nil {
		log.Error("Happened error when updating data to database. Error", err)
		util.PanicException(constant.UnknownError)
	}

	c.JSON(http.StatusOK, util.BuildResponse(constant.Success, data))
}

func (u PaymentServiceImpl) GetPaymentById(c *gin.Context) {
	defer util.PanicHandler(c)

	log.Info("start to execute program get payment by id")
	paymentID, _ := uuid.Parse(c.Param("paymentID"))

	data, err := u.paymentRepository.FindPaymentById(paymentID)
	if err != nil {
		log.Error("Happened error when get data from database. Error", err)
		util.PanicException(constant.DataNotFound)
	}

	c.JSON(http.StatusOK, util.BuildResponse(constant.Success, data))
}

func (u PaymentServiceImpl) AddPaymentData(c *gin.Context) {
	defer util.PanicHandler(c)

	log.Info("start to execute program add data payment")
	var request dao.Payment
	if err := c.ShouldBindJSON(&request); err != nil {
		log.Error("Happened error when mapping request from FE. Error", err)
		util.PanicException(constant.InvalidRequest)
	}

	// hash, _ := bcrypt.GenerateFromPassword([]byte(request.Password), 15)
	// request.Password = string(hash)

	data, err := u.paymentRepository.Save(&request)
	if err != nil {
		log.Error("Happened error when saving data to database. Error", err)
		util.PanicException(constant.UnknownError)
	}

	c.JSON(http.StatusOK, util.BuildResponse(constant.Success, data))
}

func (u PaymentServiceImpl) GetAllPayment(c *gin.Context) {
	defer util.PanicHandler(c)

	log.Info("start to execute get all data payment")

	data, err := u.paymentRepository.FindAllPayment()

	if err != nil {
		log.Error("Happened Error when find all payment data. Error: ", err)
		util.PanicException(constant.UnknownError)
	}

	c.JSON(http.StatusOK, util.BuildResponse(constant.Success, data))
}

func (u PaymentServiceImpl) DeletePayment(c *gin.Context) {
	defer util.PanicHandler(c)

	log.Info("start to execute delete data payment by id")
	paymentID, _ := uuid.Parse(c.Param("paymentID"))

	err := u.paymentRepository.DeletePaymentById(paymentID)
	if err != nil {
		log.Error("Happened Error when try delete data payment from DB. Error:", err)
		util.PanicException(constant.UnknownError)
	}

	c.JSON(http.StatusOK, util.BuildResponse(constant.Success, util.Null()))
}

func PaymentServiceInit(paymentRepository repository.PaymentRepository) *PaymentServiceImpl {
	return &PaymentServiceImpl{
		paymentRepository: paymentRepository,
	}
}
