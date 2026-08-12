\# 🎟️ Biletixa



Biletixa, etkinliklerin görüntülenebildiği, favorilere eklenebildiği ve bilet satın alma işlemlerinin gerçekleştirilebildiği mikroservis tabanlı bir etkinlik ve bilet yönetim uygulamasıdır.



Proje; bağımsız backend servisleri, merkezi API Gateway, MongoDB veritabanları ve Next.js tabanlı kullanıcı arayüzünden oluşmaktadır.



\## ✨ Özellikler



\- Kullanıcı kayıt ve giriş işlemleri

\- BCrypt ile güvenli parola saklama

\- E-posta ile 6 haneli hesap doğrulama kodu

\- Doğrulanmamış hesapların girişinin engellenmesi

\- Etkinlikleri listeleme ve detaylarını görüntüleme

\- Etkinlikleri favorilere ekleme ve favorilerden çıkarma

\- Bilet oluşturma ve kullanıcı biletlerini görüntüleme

\- Ödeme işlemlerinin yönetimi

\- Mikroservisler arası API iletişimi

\- API Gateway üzerinden merkezi erişim

\- Docker ve Docker Compose ile container tabanlı çalışma



\## 🏗️ Mikroservis Mimarisi



Projede aşağıdaki servisler bulunmaktadır:



| Servis | Port | Görev |

|---|---:|---|

| API Gateway | 8080 | İsteklerin ilgili mikroservislere yönlendirilmesi |

| Event Service | 8081 | Etkinlik işlemleri |

| Ticket Service | 8082 | Bilet işlemleri |

| Payment Service | 8083 | Ödeme işlemleri |

| Favorite Service | 8084 | Favori etkinlik işlemleri |

| User Service | 8085 | Kullanıcı, giriş ve e-posta doğrulama işlemleri |

| Frontend | 3000 | Kullanıcı arayüzü |



Her mikroservis kendi sorumluluk alanına göre ayrılmıştır ve MongoDB kullanmaktadır.



\## 🛠️ Kullanılan Teknolojiler



\### Backend

\- Java 17

\- Spring Boot

\- Spring Data MongoDB

\- Spring Cloud Gateway

\- BCrypt

\- Spring Mail



\### Frontend

\- Next.js

\- React

\- TypeScript

\- Tailwind CSS



\### Veritabanı ve Altyapı

\- MongoDB

\- Docker

\- Docker Compose

\- REST API



\## 📁 Proje Yapısı



```text

biletixa/

├── frontend/

├── microservices/

│   ├── api-gateway/

│   ├── event-service/

│   ├── favorite-service/

│   ├── payment-service/

│   ├── ticket-service/

│   └── user-service/

├── docker-compose.yml

├── .env.example

└── README.md

