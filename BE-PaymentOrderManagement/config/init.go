package config

import (
	"be-paymentordermanagement/app/controller"
	"be-paymentordermanagement/app/repository"
	"be-paymentordermanagement/app/service"
)

type Initialization struct {
	paymentRepo repository.PaymentRepository
	paymentSvc  service.PaymentService
	PaymentCtrl controller.PaymentController
}

func NewInitialization(paymentRepo repository.PaymentRepository,
	paymentService service.PaymentService,
	paymentCtrl controller.PaymentController) *Initialization {
	return &Initialization{
		paymentRepo: paymentRepo,
		paymentSvc:  paymentService,
		PaymentCtrl: paymentCtrl,
	}
}
