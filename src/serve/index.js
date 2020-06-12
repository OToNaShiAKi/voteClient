import axios from 'axios';
import { Notify } from 'vant';

Notify.setDefaultOptions({
    duration: 1500
})

const base = process.env.NODE_ENV === 'development' ? '/api/' : 'http://hustmaths.top:3000/'

const Handle = (res) => {
    Notify({
        type: res.type || 'danger',
        message: res.message || '网络错误',
    })
}

export const AddCandidate = (candidate) =>
    axios.post(base + 'add', candidate).then(res => {
        if (res.data.status !== 200) throw res.data;
        res.data.type = 'success';
        Handle(res.data)
    }).catch(Handle)

export const GetCandidates = () =>
    axios.get(base + 'cards').then(res => {
        if (res.data.status !== 200) throw res.data;
        res.data.type = 'success';
        Handle(res.data)
        return res.data.cards
    }).catch(Handle)

export const VoteCandidates = (checked, voter) =>
    axios.post(base + 'vote', { ...checked, voter }).then(res => {
        if (res.data.status !== 200) throw res.data;
        res.data.type = 'success';
        Handle(res.data)
    }).catch(Handle)

export const VoteResult = () =>
    axios.get(base + 'result').then(res => {
        if (res.data.status !== 200) throw res.data;
        res.data.type = 'success';
        Handle(res.data)
        return res.data.result;
    }).catch(Handle)
