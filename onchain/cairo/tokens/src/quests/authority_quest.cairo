#[starknet::contract]
pub mod AuthorityQuest {
    use afk_games::interfaces::pixel_template::{ITemplateStoreDispatcher, ITemplateStoreDispatcherTrait};
    use afk_games::interfaces::quests::{IAuthorityQuest, IQuest};
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map
    };

    use starknet::{ContractAddress, get_caller_address};
    #[storage]
    struct Storage {
        art_peace: ContractAddress,
        authority: ContractAddress,
        reward: u32,
        claimable: Map<ContractAddress, bool>,
        claimed: Map<ContractAddress, bool>,
    }

    #[derive(Drop, Serde)]
    pub struct AuthorityQuestInitParams {
        pub art_peace: ContractAddress,
        pub authority: ContractAddress,
        pub reward: u32,
    }

    #[constructor]
    fn constructor(ref self: ContractState, init_params: AuthorityQuestInitParams) {
        self.art_peace.write(init_params.art_peace);
        self.authority.write(init_params.authority);
        self.reward.write(init_params.reward);
    }

    #[abi(embed_v0)]
    impl AuthorityQuestImpl of IAuthorityQuest<ContractState> {
        fn is_claimed(self: @ContractState, user: ContractAddress) -> bool {
            self.claimed.read(user)
        }

        fn mark_claimable(ref self: ContractState, calldata: Span<felt252>) {
            assert(get_caller_address() == self.authority.read(), 'Only authority address allowed');
            let mut i = 0;
            while i < calldata.len() {
                self.claimable.entry((*calldata[i]).try_into().unwrap()).write(true);
                i += 1;
            }
        }
    }

    #[abi(embed_v0)]
    impl AuthorityQuestTemplateImpl of IQuest<ContractState> {
        fn get_reward(self: @ContractState) -> u32 {
            self.reward.read()
        }

        fn is_claimable(
            self: @ContractState, user: ContractAddress, calldata: Span<felt252>
        ) -> bool {
            if self.claimed.read(user) {
                return false;
            }

            if self.claimable.read(user) {
                true
            } else {
                false
            }
        }

        fn claim(ref self: ContractState, user: ContractAddress, calldata: Span<felt252>) -> u32 {
            assert(get_caller_address() == self.art_peace.read(), 'Only ArtPeace can claim quests');

            assert(self.is_claimable(user, calldata), 'Quest not claimable');

            self.claimed.entry(user).write(true);
            let reward = self.reward.read();

            reward
        }
    }
}
