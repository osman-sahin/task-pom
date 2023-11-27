package repository

import (
	"be-paymentordermanagement/app/model/dao"

	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type PaymentRepository interface {
	FindAllPayment() ([]dao.Payment, error)
	FindPaymentById(id uuid.UUID) (dao.Payment, error)
	Save(payment *dao.Payment) (dao.Payment, error)
	DeletePaymentById(id uuid.UUID) error
}

type PaymentRepositoryImpl struct {
	db *gorm.DB
}

func (u PaymentRepositoryImpl) FindAllPayment() ([]dao.Payment, error) {
	var payments []dao.Payment

	var err = u.db.Find(&payments).Error
	if err != nil {
		log.Error("Got an error finding all couples. Error: ", err)
		return nil, err
	}

	return payments, nil
}

func (u PaymentRepositoryImpl) FindPaymentById(id uuid.UUID) (dao.Payment, error) {
	payment := dao.Payment{
		ID: id,
	}
	err := u.db.First(&payment).Error
	if err != nil {
		log.Error("Got and error when find payment by id. Error: ", err)
		return dao.Payment{}, err
	}
	return payment, nil
}

func (u PaymentRepositoryImpl) Save(payment *dao.Payment) (dao.Payment, error) {
	var err = u.db.Save(payment).Error
	if err != nil {
		log.Error("Got an error when save payment. Error: ", err)
		return dao.Payment{}, err
	}
	return *payment, nil
}

func (u PaymentRepositoryImpl) DeletePaymentById(id uuid.UUID) error {
	err := u.db.Delete(&dao.Payment{}, id).Error
	if err != nil {
		log.Error("Got an error when delete payment. Error: ", err)
		return err
	}
	return nil
}

func PaymentRepositoryInit(db *gorm.DB) *PaymentRepositoryImpl {
	db.AutoMigrate(&dao.Payment{})
	return &PaymentRepositoryImpl{
		db: db,
	}
}
