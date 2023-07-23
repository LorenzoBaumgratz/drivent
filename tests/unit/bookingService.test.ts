import bookingRepository from "@/repositories/booking-repository"
import enrollmentRepository from "@/repositories/enrollment-repository"
import ticketsRepository from "@/repositories/tickets-repository"
import { getBookingService, postBookingService, putBookingService } from "@/services/booking-service"

beforeEach(()=>{
    jest.clearAllMocks()
})

describe("POST /booking service unit test",()=>{
    it("should respond with status 403 when user has remote ticket",async()=>{

        jest.spyOn(enrollmentRepository,"findWithAddressByUserId").mockResolvedValue({
            id:1,
            name:"Lorenzo",
            cpf:"07879914145",
            birthday:new Date(),
            phone:"(48)99132-3411",
            userId:1,
            Address:[],
            createdAt: new Date(),
            updatedAt: new Date()
        })
        jest.spyOn(ticketsRepository,"findTicketByEnrollmentId").mockResolvedValueOnce({
            id:1,
            ticketTypeId:1,
            enrollmentId:1,
            status:"PAID",
            TicketType:{
                id:1,
                includesHotel:false,
                isRemote:true,
                name:"lorem",
                price:25,
                createdAt: new Date(),
                updatedAt: new Date()
            },          
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const result= postBookingService(1,1)
        expect(result).rejects.toEqual(expect.objectContaining({
            status:403,
            statusText:"Outside business rules",
        }))
    })

    it("should respond with status 403 when doesnt include hotel",async()=>{
        jest.spyOn(enrollmentRepository,"findWithAddressByUserId").mockResolvedValue({
            id:1,
            name:"Lorenzo",
            cpf:"07879914145",
            birthday:new Date(),
            phone:"(48)99132-3411",
            userId:1,
            Address:[],
            createdAt: new Date(),
            updatedAt: new Date()
        })
        jest.spyOn(ticketsRepository,"findTicketByEnrollmentId").mockResolvedValueOnce({
            id:1,
            ticketTypeId:1,
            enrollmentId:1,
            status:"PAID",
            TicketType:{
                id:1,
                includesHotel:false,
                isRemote:false,
                name:"lorem",
                price:25,
                createdAt: new Date(),
                updatedAt: new Date()
            },          
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const result= postBookingService(1,1)
        expect(result).rejects.toEqual(expect.objectContaining({
            status:403,
            statusText:"Outside business rules",
        }))
    })

    it("should respond with status 403 when isnt paid",async()=>{
        jest.spyOn(enrollmentRepository,"findWithAddressByUserId").mockResolvedValue({
            id:1,
            name:"Lorenzo",
            cpf:"07879914145",
            birthday:new Date(),
            phone:"(48)99132-3411",
            userId:1,
            Address:[],
            createdAt: new Date(),
            updatedAt: new Date()
        })
        jest.spyOn(ticketsRepository,"findTicketByEnrollmentId").mockResolvedValueOnce({
            id:1,
            ticketTypeId:1,
            enrollmentId:1,
            status:"RESERVED",
            TicketType:{
                id:1,
                includesHotel:true,
                isRemote:false,
                name:"lorem",
                price:25,
                createdAt: new Date(),
                updatedAt: new Date()
            },          
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const result= postBookingService(1,1)
        expect(result).rejects.toEqual(expect.objectContaining({
            status:403,
            statusText:"Outside business rules",
        }))
    })

    it("should respond with bookingId when everything is OK",async()=>{
        jest.spyOn(enrollmentRepository,"findWithAddressByUserId").mockResolvedValue({
            id:1,
            name:"Lorenzo",
            cpf:"07879914145",
            birthday:new Date(),
            phone:"(48)99132-3411",
            userId:1,
            Address:[],
            createdAt: new Date(),
            updatedAt: new Date()
        })
        jest.spyOn(ticketsRepository,"findTicketByEnrollmentId").mockResolvedValueOnce({
            id:1,
            ticketTypeId:1,
            enrollmentId:1,
            status:"PAID",
            TicketType:{
                id:1,
                includesHotel:true,
                isRemote:false,
                name:"lorem",
                price:25,
                createdAt: new Date(),
                updatedAt: new Date()
            },          
            createdAt: new Date(),
            updatedAt: new Date()
        })
        jest.spyOn(bookingRepository,"checkRoomId").mockResolvedValue({
            id:1,
            name:"opa",
            capacity:1,
            hotelId:1,      
            createdAt: new Date(),
            updatedAt: new Date()
        })
        jest.spyOn(bookingRepository,"findBookingWithRoomId").mockResolvedValue([])
        jest.spyOn(bookingRepository,"postBookingRep").mockResolvedValue({
            id:1,
            roomId:1,
            userId:1,       
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const result= await postBookingService(1,1)
        expect(result).toEqual(1)
    })
})

describe("POST /booking service unit test",()=>{
    it("should respond with status 403 when user doesnt have booking",async()=>{
        jest.spyOn(bookingRepository,"findBookingByUserId").mockResolvedValue(undefined)
        const result= putBookingService(1,1,1)
        expect(result).rejects.toEqual(expect.objectContaining({
            status:403,
            statusText:"Outside business rules",
        }))
    })
    it("should respond with status 403 when room is full",async()=>{
        jest.spyOn(bookingRepository,"findBookingByUserId").mockResolvedValue({
            id:1,
            roomId:1,
            userId:1,
            Room:{
                id:1,
                name:"opa",
                capacity:1,
                hotelId:1,      
                createdAt: new Date(),
                updatedAt: new Date()
            },       
            createdAt: new Date(),
            updatedAt: new Date()
        })
        jest.spyOn(bookingRepository,"checkRoomId").mockResolvedValue({
            id:1,
            name:"opa",
            capacity:1,
            hotelId:1,      
            createdAt: new Date(),
            updatedAt: new Date()
        })
        jest.spyOn(bookingRepository,"findBookingWithRoomId").mockResolvedValue([
            {
                id:1,
                roomId:1,
                userId:1,
                createdAt: new Date(),
                updatedAt: new Date() 
            }
        ])
        const result= putBookingService(1,1,1)
        expect(result).rejects.toEqual(expect.objectContaining({
            status:403,
            statusText:"Outside business rules",
        }))
    })
    it("should respond with bookingId when everything is OK",async()=>{

        jest.spyOn(bookingRepository,"findBookingByUserId").mockResolvedValue({
            id:1,
            roomId:1,
            userId:1,
            Room:{
                id:1,
                name:"opa",
                capacity:1,
                hotelId:1,      
                createdAt: new Date(),
                updatedAt: new Date()
            },       
            createdAt: new Date(),
            updatedAt: new Date()
        })
        jest.spyOn(bookingRepository,"checkRoomId").mockResolvedValue({
            id:1,
            name:"opa",
            capacity:1,
            hotelId:1,      
            createdAt: new Date(),
            updatedAt: new Date()
        })
        jest.spyOn(bookingRepository,"findBookingWithRoomId").mockResolvedValue([])
        jest.spyOn(bookingRepository,"putBookingRep").mockResolvedValue({
            id:1,
            roomId:1,
            userId:1,
            createdAt: new Date(),
            updatedAt: new Date() 
        })
        const result= await putBookingService(1,1,1)
        expect(result).toEqual(1)
    })
})

