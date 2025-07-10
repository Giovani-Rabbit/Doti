import { AccountDTO } from "@/modules/auth/interfaces/dto/authentication_dto";
import HttpService, { IHttpResult } from "@/util/http/http_service";
import { UserErrorStatus } from "../domain/user_exceptions";

function AccountService() {
    const httpService = new HttpService("users");

    async function createAccount(account: AccountDTO) {
        const res = await httpService.post<
            IHttpResult<AccountDTO[], UserErrorStatus>,
            AccountDTO
        >({
            url: "/",
            data: account
        });

        return res;
    }

    return { createAccount };
}

export default AccountService;
