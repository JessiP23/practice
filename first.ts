type Listener<T> = (payload: T) => void

class EventEmitter<Events extends Record<string, unknown>> {
  private listeners = {} as { [K in keyof Events]?: Listener<Events[K]>[] }

  on<K extends keyof Events>(event: K, fn: Listener<Events[K]>): this {
    this.listeners[event]?.push(fn) || (this.listeners[event] = [fn])
    return this
  }
  off<K extends keyof Events>(event: K, fn: Listener<Events[K]>): this {
    this.listeners[event] = this.listeners[event]?.filter((f) => f !== fn)
    return this
  }
  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    this.listeners[event]?.forEach((fn) => fn(payload))
  }
}

const emitter = new EventEmitter<{ login: { userId: string }; logout: void }>()
const onLogin = ({ userId }: { userId: string }) => console.log('login:', userId)
const onLogout = () => console.log('logout')

emitter.on('login', onLogin)
emitter.on('logout', onLogout)

emitter.emit('login', { userId: 'u-123' })
emitter.emit('logout', undefined)

emitter.off('login', onLogin)
emitter.emit('login', { userId: 'u-456' })
