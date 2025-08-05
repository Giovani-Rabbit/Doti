import HttpService from "@/util/http/http_service";
import { AccountDTO } from "./account_dto";

function AccountService() {
    const httpService = new HttpService("users");

    async function createAccount(account: AccountDTO) {
        const res = await httpService.post<
            AccountDTO,
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
