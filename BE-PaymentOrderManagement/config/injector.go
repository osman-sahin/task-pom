//go:build wireinject
// +build wireinject

package config

import (
	"be-paymentordermanagement/app/controller"
	"be-paymentordermanagement/app/repository"
	"be-paymentordermanagement/app/service"

	"github.com/google/wire"
)

var db = wire.NewSet(ConnectToDB)

var paymentServiceSet = wire.NewSet(service.PaymentServiceInit,
	wire.Bind(new(service.PaymentService), new(*service.PaymentServiceImpl)),
)

var paymentRepoSet = wire.NewSet(repository.PaymentRepositoryInit,
	wire.Bind(new(repository.PaymentRepository), new(*repository.PaymentRepositoryImpl)),
)

var paymentCtrlSet = wire.NewSet(controller.PaymentControllerInit,
	wire.Bind(new(controller.PaymentController), new(*controller.PaymentControllerImpl)),
)

func Init() *Initialization {
	wire.Build(NewInitialization, db, paymentCtrlSet, paymentServiceSet, paymentRepoSet)
	return nil
}
