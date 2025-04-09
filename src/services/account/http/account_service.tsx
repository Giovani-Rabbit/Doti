import { AccountDTO, CreateAccountFormDTO } from "@/modules/auth/interfaces/dto/authentication_dto";
import HttpService from "@/util/http/http_service";
import { HttpMessageResponse } from "@/util/http/type/http_message_response";

function AccountService() {
    const httpService = new HttpService("account");

    async function createAccount(account: AccountDTO) {
        const res = await httpService.post<
            HttpMessageResponse,
            AccountDTO
        >({
            url: "/",
            data: account
        });

        return res;
    }

    return { createAccount }
}

export default AccountService;