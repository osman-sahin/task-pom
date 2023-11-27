package controller

import (
	"be-paymentordermanagement/app/service"

	"github.com/gin-gonic/gin"
)

type PaymentController interface {
	GetAll(c *gin.Context)
	Add(c *gin.Context)
	GetById(c *gin.Context)
	Update(c *gin.Context)
	Delete(c *gin.Context)
}

type PaymentControllerImpl struct {
	svc service.PaymentService
}

func (u PaymentControllerImpl) GetAll(c *gin.Context) {
	u.svc.GetAllPayment(c)
}

func (u PaymentControllerImpl) Add(c *gin.Context) {
	u.svc.AddPaymentData(c)
}

func (u PaymentControllerImpl) GetById(c *gin.Context) {
	u.svc.GetPaymentById(c)
}

func (u PaymentControllerImpl) Update(c *gin.Context) {
	u.svc.UpdatePaymentData(c)
}

func (u PaymentControllerImpl) Delete(c *gin.Context) {
	u.svc.DeletePayment(c)
}

func PaymentControllerInit(paymentService service.PaymentService) *PaymentControllerImpl {
	return &PaymentControllerImpl{
		svc: paymentService,
	}
}
