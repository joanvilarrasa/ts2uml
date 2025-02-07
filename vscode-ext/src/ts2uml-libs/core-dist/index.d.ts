import * as _ts2uml_models from '@ts2uml/models';
import { Config } from '@ts2uml/models';

declare function generateGraph(dir: string, config?: Partial<Config>): Promise<_ts2uml_models.Graph>;

export { generateGraph };
