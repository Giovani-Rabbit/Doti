import { AccountFormDTO } from "@/modules/auth/interfaces/dto/authentication_dto";
import HttpService from "@/util/http/http_service";
import { HttpMessageResponse } from "@/util/http/type/http_message_response";

function AccountService() {
    const httpService = new HttpService("account");

    async function createAccount(account: AccountFormDTO) {
        const res = httpService.post<HttpMessageResponse, AccountFormDTO>({
            url: "/",
            data: account
        })
    }

    return { createAccount }
}

export default AccountService;